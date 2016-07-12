/* eslint-disable strict */
'use strict';

const gulp = require('gulp');
const gulpPkg = require('gulp-load-plugins')();
const webpack = require('webpack');
const webpackWebDevConfig = require('./webpack.config.web.dev');
const webpackWebProdConfig = require('./webpack.config.web.prod');
const packager = require('electron-packager');
const del = require('del');

gulp.task('clean', (cb) => {
  del(['./dist', './build', './installer']);
  cb();
});

gulp.task('setEnv', (cb) => {
  gulpPkg.env({
    file: '.env.json',
  });
  cb();
});

gulp.task('webpack', ['setEnv'], (cb) => {
  let webpackConfig = null;

  if (process.env.RUNTIME === 'web') {
    if (process.env.NODE_ENV === 'production') {
      webpackConfig = webpackWebProdConfig;
    } else {
      webpackConfig = webpackWebDevConfig;
    }
  } else {
    if (process.env.NODE_ENV === 'production') {
      webpackConfig = webpackElectronProdConfig;
    } else {
      webpackConfig = webpackElectronDevConfig;
    }
  }

  webpack(webpackConfig, (err, stats) => {
    if (err) throw new gulpPkg.util.PluginError('webpack', err);
    gulpPkg.util.log('[webpack]', stats.toString());
    cb();
  });
});
