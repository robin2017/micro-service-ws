const path = require('path');
process.env.TARGET='lib';
const args = [
    "build",
    {
        _: ['build', 'src/modules/HelloModule/Index.vue'],
        modern: false,
        report: false,
        'report-json': false,
        'inline-vue': false,
        watch: false,
        open: false,
        copy: false,
        https: false,
        verbose: false,
        dest: 'packages_lib/HelloModule',
        target: 'lib',
        name: 'ms_lib_hello'
    },
    [
        'build',
        '--dest',
        'packages_lib/HelloModule',
        '--target',
        'lib',
        '--name',
        'ms_lib_hello',
        'src/modules/HelloModule/Index.vue'
    ]
];

const Service = require('@vue/cli-service/lib/Service')
const service = new Service(path.resolve('./'))
service.run(...args).catch(err => {
    console.error(err)
    process.exit(1)
})
