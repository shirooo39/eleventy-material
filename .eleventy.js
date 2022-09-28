const { DateTime } = require("luxon");
const fs = require("fs");
const htmlmin = require("html-minifier");
const image = require("@11ty/eleventy-img");

async function imageShortcode(imageSource, imageSize, imageFormat, imageAlternate, imageClass) {
    // async function imageShortcode(image_size, image_format, image_class, image_source, image_alternate) {
        // if (image_size === undefined) {
        //     throw new Error(`Missing \`alt\` on image from: ${image_source}`);
        // }
        
        // if (image_format === undefined) {
        //     throw new Error(`Missing \`alt\` on image from: ${image_source}`);
        // }
    
        // if (image_class === undefined) {
        //     throw new Error(`Missing \`alt\` on image from: ${image_source}`);
        // }
    
        if (imageAlternate === undefined) {
            throw new Error(`Missing \`alt\` on image from: ${imageSource}`);
        }
    
        let metadata = await image(imageSource || "source/assets/images/placeholder.jpg", {
            widths: [imageSize],
            formats: [imageFormat],
            outputDir: "site/assets/images",
            urlPath: "/assets/images",
        });
        
        let data
        if (imageFormat == "avif") {
            data = metadata.avif[metadata.avif.length - 1];
        } else {
            data = metadata.webp[metadata.webp.length - 1];
        }
    
        return `<img class="${imageClass}" src="${data.url}" width="${data.width}" height="${data.height}" alt="${imageAlternate}" loading="lazy" decoding="async">`;
    }

module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy({
        "source/assets/css": "assets/css",
        "source/assets/js": "assets/js",
        "source/assets/fonts": "assets/fonts",
        "source/assets/icons": "assets/icons",
        "source/manifest.webmanifest" : "manifest.webmanifest"
    });

    eleventyConfig.addCollection("posts", function(collectionApi) {
        return collectionApi.getFilteredByGlob("source/posts/**/*.md");
    });
    
    eleventyConfig.addCollection("catList", function(collectionApi) {
        const categoriesList = new Set();

        collectionApi.getAll().map( item => {
            if (item.data.categories) {
                item.data.categories.map( category => categoriesList.add(category))
            }
        });
        
        return categoriesList;
    });
    eleventyConfig.addCollection("tagList", function(collectionApi) {
        const tagsList = new Set();

        collectionApi.getAll().map( item => {
            if (item.data.tags) {
                item.data.tags.map( tag => tagsList.add(tag))
            }
        });
        
        return tagsList;
    });

    eleventyConfig.addCollection('catPost', collection => {
        let catSet = {};
        collection.getAll().forEach(item => {
            if (!item.data.categories) return;
            item.data.categories.filter(
                cat => !['posts', 'all'].includes(cat)
            ).forEach(
                cat => {
                    if (!catSet[cat]) { catSet[cat] = []; }
                    catSet[cat].push(item)
                }
            );
        });
        return catSet;
    });
    eleventyConfig.addCollection('tagPost', collection => {
        const tagsSet = {};
        collection.getAll().forEach(item => {
            if (!item.data.tags) return;
            item.data.tags.filter(
                tag => !['posts', 'all'].includes(tag)
            ).forEach(
                tag => {
                    if (!tagsSet[tag]) { tagsSet[tag] = []; }
                    tagsSet[tag].push(item)
                }
            );
        });
        return tagsSet;
    });

    eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);

    eleventyConfig.addFilter("readableDate", (dateObj) => {
        return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
    });

    eleventyConfig.setFrontMatterParsingOptions({
        excerpt: true,
        excerpt_separator: "<!-- summary -->"
    });
    
    eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
        if (outputPath && outputPath.endsWith(".html")) {
            let minified = htmlmin.minify(content, {
                useShortDoctype: true,
                removeComments: true,
                collapseWhitespace: true

            });
            return minified;
        };
    
        return content;
    });

    eleventyConfig.setBrowserSyncConfig({
        callbacks: {
            ready: function (err, browserSync) {
                const content_404 = fs.readFileSync("site/404.html");

                browserSync.addMiddleware("*", (req, res) => {
                    res.write(content_404);
                    res.end();
                });
            },
        },
        ui: false,
        ghostMode: false,
    });

    return {
        htmlTemplateEngine: "njk",
        markdownTemplateEngine: "njk",

        dir: {
            input: "source",
            data: "data",
            includes: "includes",
            layouts: "layouts",
            output: "site"
        }
    };
}
