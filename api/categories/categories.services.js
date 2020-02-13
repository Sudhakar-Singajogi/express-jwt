const pool = require("../../configuration/dbConn");

module.exports = {
    getcategoriesforproducts: (categoryStatus, callBack) => {
        console.log(categoryStatus);
        if (categoryStatus) {
            pool.query(
                `select * from getcategoriesforproducts where mst007_category_isdisplay=? `, [categoryStatus],
                (error, results, fields) => {
                    if (error) {
                        return callBack(error);
                    } else {
                        return callBack(null, results);
                    }
                }
            );
        } else {
            pool.query(
                `select * from getcategoriesforproducts`, [],
                (error, results, fields) => {
                    if (error) {
                        return callBack(error);
                    } else {
                        return callBack(null, results);
                    }
                }
            );
        }
    },
    createCategory: (data, callBack) => {
        var bodyData = data.fields;
        pool.query(
            `insert into inv_mst_category (
                                mst007_category_parent_id, mst007_category_name, mst007_category_shortname, 
                                category_banner_img, banner_img_message, mst007_category_sitelink, mst007_category_entryby,
                                mst007_category_modifiedby) values (?,?,?,?,?,?,?,?)`, [
                bodyData.parentId,
                bodyData.categoryName,
                bodyData.shortName,
                "upload/categoryImages/" + data.file.filename,
                bodyData.bannerImageMessage,
                bodyData.messageSiteLink,
                bodyData.entryBy,
                bodyData.modifiedBy
            ],
            (err, result, fields) => {
                if (err) {
                    return callBack(err);
                } else {
                    return callBack(null, result);
                }
            }
        );
    },
    parentCategoryExists: (parentCategory, callBack) => {
        pool.query(
            `select mst007_category_name from inv_mst_category where mst007_category_id=` +
            parentCategory, [],
            (error, result, fields) => {
                if (error) {
                    return callBack(error);
                } else {
                    if (result.length > 0) {
                        return callBack(null, result);
                    } else {
                        return callBack(true);
                    }
                }
            }
        );
    }
};