const { Preset } = require('use-preset')

// prettier-ignore
module.exports = Preset.make('Laravel Tailwind CSS')
  .option('interaction', true)
  .option('init-laravel', true)

	.apply('ycs77/preset-laravel-init')
    .if(({ flags }) => Boolean(flags.initLaravel))
		.title('Initialize Laravel for Lucas')
		.with('--no-interaction')
		.chain()

  .editJson('package.json')
    .title('Add Tailwind CSS')
    .merge({
      devDependencies: {
        '@tailwindcss/ui': '^0.5',
        '@tailwindcss/typography': '^0.2',
        'postcss-nested': '^4',
        'postcss-import': '^12',
        tailwindcss: '^1.7'
      }
    })
    .delete(['devDependencies.sass', 'devDependencies.sass-loader'])
    .chain()

  .delete()
    .title('Delete SASS')
    .directories('resources/sass')
    .chain()

  .copyTemplates()

  .installDependencies()
    .if(({ flags }) => Boolean(flags.interaction))
    .for('node')
    .title('Install node dependencies')
    .chain()

  .updateDependencies()
    .if(({ flags }) => Boolean(flags.interaction))
    .withoutAsking()
    .for('node')
    .title('Update node dependencies')
    .chain()
