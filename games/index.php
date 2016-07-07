<?php
function da($var) {
  echo '<pre>';
  print_r($var);
  echo '</pre>';
}

function getAllGames() {
  return getAllSubdirectories();
}

/**
 * [getAllSubdirectories description]
 *
 * @see http://stackoverflow.com/questions/2524151/php-get-all-subdirectories-of-a-given-directory
 * 
 * @return [type] [description]
 */
function getAllSubdirectories() {
  return array_filter(glob('*'), 'is_dir');
}

$games = getAllGames();
$nGames = count($games);
$i = 0;

if ($nGames > 0) {
  printf('%s games<br /><br />', $nGames);

  for ($i = 0; $i < $nGames; $i++) {
    printf('%s: %s<br />', $i, $games[$i]);
  }
}
?>
