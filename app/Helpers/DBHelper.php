<?php

namespace App\Helpers;

use App\Redemptions;
use App\VendorReview;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class DBHelper
{

    public static function redemptions($user_id = null)
    {
        $redemptions = DB::table("redemptions AS re")
            ->select(
                "v.name as vendor_name",
                "v.logo as vendor_logo",
                "voc.name as voucher_name",
                "re.reference_code",
                "re.total_savings",
                "re.created_at",
                "c.retail",
                "c.gold"
            )
            ->join("vouchers AS voc", "voc.id", "=", "re.voucher_id")
            ->join("vendors AS v", "v.id", "=", "re.vendor_id")
            ->join("categories AS c", "c.id", "=", "v.category_id");

        if ($user_id) {
            $redemptions->where("user_id", $user_id);
        }
        return $redemptions->get();
    }

    public static function userHasVendors($user, $type = null)
    {
        $userHasVendors = DB::table("user_has_vendors AS uhv")
            ->selectRaw(
                "v.id,
                v.name,
                v.category_id,
                v.latitude,
                v.longitude,
                v.locality,
                v.logo,
                v.header as header,
                categories.gold as gold,
                categories.retail as retail,
                IF(vendor_views.vendor_id, (SELECT SUM(view) AS total_views FROM vendor_views where partner_id = ? AND vendor_id = v.id), 0) AS total_views,
                (SELECT COUNT(ve.id) AS total_locations FROM vendors AS ve where ve.parent_id = v.id ) AS total_locations",
                [$user->partner_id]
            )
            ->join("users AS u", "uhv.user_id", "=", "u.id")
            ->join("vendors AS v", "v.id", "=", "uhv.vendor_id")
            ->join("categories", "categories.id", "=", "v.category_id")
            ->leftJoin("vendor_views", function ($join) use ($user) {
                $join->on("vendor_views.vendor_id", "=", "v.id")
                    ->where(["vendor_views.partner_id" => $user->partner_id]);
            });

        if ($user) {
            $userHasVendors->where(["uhv.user_id" => $user->id]);
        }
        if ($type) {
            $userHasVendors->where(["type" => $type]);
        }
        return $userHasVendors->get();
    }

    public static function userHasBadges($user_id)
    {
        $userHasBadges = DB::table("badges")
            ->selectRaw(
                "badges.id,name,IF(uhb.user_id = ?,active_description,inactive_description) AS description,IF(uhb.user_id = ?,active_image,inactive_image) AS image, IF(uhb.user_id = ?,'active','inactive') as status",
                [$user_id, $user_id, $user_id]
            )
            ->leftJoin("user_has_badges AS uhb", "uhb.badge_id", "=", "badges.id");

        return $userHasBadges->get();
    }

    public static function userHasLevels($user_id)
    {
        $userHasBadges = DB::table("levels")
            ->selectRaw(
                "levels.id,name,IF(uhb.user_id = ?,active_description,inactive_description) AS description,IF(uhb.user_id = ?,active_image,inactive_image) AS image, IF(uhb.user_id = ?,'active','inactive') as status",
                [$user_id, $user_id, $user_id]
            )
            ->leftJoin("user_levels AS uhb", "uhb.level_id", "=", "levels.id");

        return $userHasBadges->get();
    }

    public static function userHasUsers($user_id, $user_type)
    {
        $friends = DB::table("user_has_users AS uhs")
            ->selectRaw("
                         IF(uhs.user_id = ?, u.id,u_from.id) AS id,
                         IF(uhs.user_id = ?, u.parent_id,u_from.parent_id) AS parent_id,
                        IF(uhs.user_id = ?, u.fname,u_from.fname) AS fname,
                        IF(uhs.user_id = ?, u.lname,u_from.lname) AS  lname,
                        IF(uhs.user_id = ?, u.avatar,u_from.avatar) AS  avatar,
                        IF(uhs.user_id = ?, u.u_vpoints,u_from.u_vpoints) AS  u_vpoints,
                        IF(uhs.relation_type != 0, ur.NAME, 'not-applicable') AS relation", [$user_id, $user_id, $user_id, $user_id, $user_id, $user_id])
            ->leftJoin("users AS u", "uhs.user_id_friend", "=", "u.id")
            ->leftJoin("users AS u_from", "uhs.user_id", "=", "u_from.id")
            ->leftJoin("user_relationships AS ur", "uhs.relation_type", "=", "ur.id");
        $friends->whereRaw("(uhs.user_id = ? OR uhs.user_id_friend = ?) AND uhs.user_type = ?", [$user_id, $user_id, $user_type]);
        return $friends->get();
    }

    public static function vendors($offer_id, $category_id, $city_id, $user, $membership_id = null)
    {
        $search = DB::table("vendors")
            ->selectRaw(
                "
                vendors.id as id,
                vendors.name as name,
                vendors.locality as locality,
                vendors.logo as logo,
                vendors.longitude as longitude,
                vendors.latitude as latitude,
                vendors.header as header,
                vendors.category_id,
                categories.gold as gold,
                categories.retail as retail,
                IF(wishlist.user_id,1,0) AS wishlist,
                IF(favorites.user_id,1,0) AS favorite,
                (SELECT COUNT(ve.id) AS total_locations FROM vendors AS ve where ve.parent_id = vendors.id ) AS total_locations"
            )
            ->join("membership_has_vendors", function ($join) use ($user, $membership_id) {
                $query_id = isset($membership_id) ? $membership_id : $user->membership_id;
                $join->on("vendors.id", "=", "membership_has_vendors.vendor_id")
                    ->where("membership_has_vendors.membership_id", $query_id);
            })
            ->join("partner_has_vendors", function ($join) use ($user) {
                $join->on("vendors.id", "=", "partner_has_vendors.vendor_id")
                    ->where("partner_has_vendors.partner_id", $user->partner_id);
            })
            ->join("vouchers", "vendors.id", "=", "vouchers.vendor_id")
            ->join("voucher_has_offers AS vhs",  function ($join) use ($offer_id) {
                $join->on("vhs.voucher_id", "=", "vouchers.id")
                    ->whereIn("vhs.offer_id", [$offer_id]);
            })
            ->join("categories", "categories.id", "=", "vendors.category_id")
            ->leftJoin("user_has_vendors AS favorites", function ($join) use ($user) {
                $join->on("favorites.vendor_id", "=", "vendors.id")
                    ->where(["favorites.user_id" => $user->id, "favorites.type" => "favorite"]);
            })
            ->leftJoin("user_has_vendors AS wishlist", function ($join) use ($user) {
                $join->on("wishlist.vendor_id", "=", "vendors.id")
                    ->where(["wishlist.user_id" => $user->id, "wishlist.type" => "wishlist"]);
            })
            ->where([
                "category_id" => $category_id,
                "city_id" => $city_id,
                "vendors.status" => "active",
                "category_id" => $category_id,
                "parent_id" => 0
            ])
            ->groupBy("vendors.id")
            ->orderBy("vendors.name");

        // $search->dd();
        return $search->get();
    }


    public static function getUserCitiesUsedCount($user_id)
    {
        $vendors = Redemptions::selectRaw("count(DISTINCT v.city_id) as cities")
            ->join("vendors AS v", "v.id", "=", "redemptions.vendor_id")
            ->where(["user_id" => $user_id])->first();
        return $vendors;
    }

    public static function vendorRatings($vendor_id)
    {
        $total = VendorReview::where([
            "vendor_id" => $vendor_id
        ])->count();
        $vendorReviews = [
            1 => 0,
            2 => 0,
            3 => 0,
            4 => 0,
            5 => 0
        ];

        if ($total !== 0) {
            $vendorReviews = [
                1 => (ceil(VendorReview::where([
                    "vendor_id" => $vendor_id,
                    "rating" => 1
                ])->count() / $total) * 100),
                2 => (ceil(VendorReview::where([
                    "vendor_id" => $vendor_id,
                    "rating" => 2
                ])->count() / $total) * 100),
                3 => (ceil(VendorReview::where([
                    "vendor_id" => $vendor_id,
                    "rating" => 3
                ])->count() / $total) * 100),
                4 => (ceil(VendorReview::where([
                    "vendor_id" => $vendor_id,
                    "rating" => 4
                ])->count() / $total) * 100),
                5 => (ceil(VendorReview::where([
                    "vendor_id" => $vendor_id,
                    "rating" => 5
                ])->count() / $total) * 100)
            ];
        }
        return $vendorReviews;
    }
}
