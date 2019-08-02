<?php
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Headers: *');
  header('Content-type: application/json; charset=UTF-8');

  $data = array(
    'item' => [
      array(
        'pref' => 'tokyo',
        'pref_code' => 13,
      ),
      array(
        'pref' => 'osaka',
        'pref_code' => 27,
      )
    ],
    'status' => 200,
    'url' => 'https://www.google.com/'
  );

  echo json_encode($data);
?>
