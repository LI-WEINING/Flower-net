// 加载模块
const {task,src,dest,watch,series,parallel} = require('gulp');
// 用于加载其他gulp插件
const load = require('gulp-load-plugins')();
// nodejs的del模块用于删除文件
const del = require('del');

// 删除dist目录
task('delDist',async ()=>{
  await del('./dist');
})

// 处理图片
task('image', async ()=>{
  src('./image/*.*')
  .pipe(dest('./dist/image'))
})

// 处理css
task('css', async ()=>{
  src('./css/*.css')
  .pipe(load.rev())
  .pipe(load.minifyCss())
  .pipe(dest('./dist/css'))
  .pipe(load.rev.manifest())
  .pipe(dest('./rev/css'))
})

// 处理js
task('script', async ()=>{
  src('./script/*.js')
  .pipe(load.rev())
  .pipe(load.babel({presets: ['@babel/env']}))
  .pipe(load.uglify())
  .pipe(dest('./dist/script'))
  .pipe(load.rev.manifest())
  .pipe(dest('./rev/js'))
})

// 处理html
task('html', async ()=>{
  src(['./rev/**/*.json','./pages/*.html'])
  .pipe(load.revCollector({replaceReved:true}))
  .pipe(load.minifyHtml())
  .pipe(dest('./dist/pages'))
})

// 启动服务，自动刷新
task('connect',async ()=>{
  load.connect.server({
    root: './dist',
    livereload: true,
    port: 3001
  });
})

// 构建生产包
task('build',series('delDist','image','css','script','html','connect'))
