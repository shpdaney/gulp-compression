import gulp from 'gulp'
import clean from 'gulp-clean'
import newer from 'gulp-newer'
import imagemin from 'gulp-imagemin'
import webp from 'gulp-webp'
import ttf2woff from 'gulp-ttf2woff'
import ttf2woff2 from 'gulp-ttf2woff2'


// Paths
// const srcFolder = './src'
const distFolder = './dist'
const path = {
  src: { // Пути откуда брать исходники
    img: 'src/images/',
    fonts: 'src/fonts/'
  },
  dist: { //Тут мы укажем куда складывать готовые после сборки файлы
    img: 'dist/images/',
    fonts: 'dist/fonts/'
  },
};

// Images
export const images = () => {
  return gulp.src([
    path.src.img + '*.{png,jpg,jpeg}'
])
    .pipe(newer(path.dist.img))
    .pipe(webp())

    .pipe(gulp.src(path.src.img + '*.{png,jpg,jpeg}'))
    .pipe(newer(path.dist.img))
    .pipe(imagemin())

    .pipe(gulp.src(path.src.img + '*.svg'))
    .pipe(newer(path.dist.img))

    .pipe(gulp.dest(path.dist.img))
}

// Fonts
export const fonts = () => {
  return gulp.src(path.src.fonts + '**/*.{ttf,otf}')
    .pipe(newer(path.dist.fonts))
    .pipe(ttf2woff({
      ignoreExt: true,
    }))
    .pipe(gulp.dest(path.dist.fonts))

    .pipe(gulp.src(path.src.fonts + '**/*.{ttf,otf}'))
    .pipe(newer(path.dist.fonts))
    .pipe(ttf2woff2({
      ignoreExt: true,
    }))
    .pipe(gulp.dest(path.dist.fonts))
}

// Clean
export const cleanFolders = () => {
  return gulp.src([
    distFolder,
    ], {
      read: false
    })
    .pipe(clean())
}

// Default
export default gulp.parallel(
  images,
  fonts
);
