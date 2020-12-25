<?php
require 'recipe/symfony.php';

// Project name
set('application', 'gpn-hr-demo');

// Set configurations
set('repository', 'git@git.accurateweb.ru:gpn/gpn-hr-demo.git');

set('shared_files', array_merge(get('shared_files'), []));
set('shared_dirs', array_merge(get('shared_dirs'), [
  'web/uploads',
  'var/uploads'
]));
set('writable_dirs', array_merge(get('writable_dirs'), [
  'web/uploads',
  'var/uploads',
]));

set('dump_assets', false);

// Configure servers
server('staging', 'staging.accurateweb.ru')
  ->user('deployer')
  ->identityFile()
  ->env('deploy_path', '/var/www/sites/gpn-hr-demo')
  ->env('branch', 'development');

before('deploy:symlink', 'database:migrate');

// Run tasks
after('deploy', 'success');
