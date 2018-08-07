module.exports = sourceMap => ({
  exclude: /\.min\.js$/, // 过滤掉以".min.js"结尾的文件，我们认为这个后缀本身就是已经压缩好的代码，没必要进行二次压缩
  cache: true,
  parallel: true, // 开启并行压缩，充分利用cpu
  sourceMap: sourceMap,
  extractComments: false,
  uglifyOptions: {
    compress: {
      // copy from vue-cli3, 去除掉一些本身就是默认配置的选项

      // 关闭一些操作用于提速
      arrows: false, // 箭头函数() => {return x} to () => x
      collapse_vars: false, // 0.3kb
      comparisons: false, // 优化比较 or and 操作符
      computed_props: false, // 优化常量计算属性 {["computed"]: 1} to {computed: 1}
      hoist_funs: false, // 函数提升 default:false
      hoist_props: false, // 属性提升 var o={p:1, q:2}; f(o.p, o.q);  to f(1, 2);
      hoist_vars: false, // 变量提升 default:false
      inline: false, // 控制函数是否内联 即var fn = () => {} 这个控制分0~3 4个等级 默认 true inline functions with arguments and variables
      loops: false, // 可静态分析时 优化 do while
      negate_iife: false, // 否定立即函数表达式，抛弃其返回值
      properties: false, // a['haha'] -> a.haha
      reduce_funcs: false, // 内联一次性函数 开启取决于reduc_vars ，禁用时某些代码在v8下会允许的更快
      reduce_vars: false, // 取出出现多次但是没有定义成变量去引用的静态值
      switches: false, // 移除重复的switch 分支
      toplevel: false, // 顶级作用域中移除未被引用的变量/函数 default:false
      typeofs: false, // typeof foo == 'undefined' -> foo === void 0

      // a few flags with noticable gains/speed ratio
      // numbers based on out of the box vendor bundle
      booleans: true, // 0.7kb  !!a ? b : c → a ? b : c default: true
      if_return: true, // 0.4kb 优化if/return if/countinue default: true
      sequences: true, // 0.7kb 使用逗号操作符连接简单语句，有组大连接值 default: true
      unused: true, // 2.3kb 删除未引用的函数和变量 default: true

      // required features to drop conditional branches
      conditionals: true,
      dead_code: true,
      evaluate: true
    },
    output: {
      comments: false, // 删除注释
      beautify: false // 最紧凑输出
    }
  }
})
