const mode = process.argv[2];

// 根据输入的命令加载执行不同的配置文件
switch(mode){
  case 'dev':
    require('./gulpfile-dev');
    break;
  case 'build':
    require('./gulpfile-build');
    break;
}
