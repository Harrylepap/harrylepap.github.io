var gulpfile = require("gulp");
var concatenation = require("gulp-concat");
var minification = require('gulp-minify');
var cleanCss = require('gulp-clean-css');
var rev = require("gulp-rev");
var del = require('del');
var font = require("gulp-font");

//nettoyage du dossier existant
gulpfile.task('clean-js', function () {
    return del([
        'assets/build/js/*.js'
    ]);
});
gulpfile.task('clean-css', function () {
    return del([
        'build/css/*.css'
    ]);
});

//tache principale
gulpfile.task("css", ['clean-css'], function () {
    return gulpfile.src(
        [
            "css/glitche-basic.css",
            "css/glitche-layout.css",
            "css/ionicons.css",
            "css/magnific-popup.css",
            "css/animate.css"
        ]
    ).pipe(concatenation("bundle.css"))
        .pipe(cleanCss())
        .pipe(rev())
        .pipe(gulpfile.dest("build/css/"))
        .pipe(rev.manifest("build/rev-manifest.json", {
            merge: true
        }))
        .pipe(gulpfile.dest(''));
});
gulpfile.task("js", ['clean-js'], function () {
    return gulpfile.src(
        [
            "js/jquery.min.js",
            "js/jquery.validate.js",
            "js/typed.js",
            "js/magnific-popup.js",
            "js/masonry.pkgd.js",
            "js/imagesloaded.pkgd.js",
            "js/masonry-filter.js",
            "js/glitche-scripts.js",
        ]

    ).pipe(concatenation("bundle.js"))
        .pipe(minification({
            ext:{
                min: ".js"
            },
            noSource: true
        }))
        .pipe(rev())
        .pipe(gulpfile.dest("build/js/"))
        .pipe(rev.manifest("build/rev-manifest.json", {
            merge: true
        }))
        .pipe(gulpfile.dest(''));
});

gulpfile.task('fonts', function() {
    return gulpfile.src(
        [
            "fonts/*"
        ])
        .pipe(gulpfile.dest('build/fonts/'));
});

gulpfile.task("default", ["fonts", "js", "css"]);