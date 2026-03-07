<?php
// path relative to this script
$dir = "Photos UME Website-3-001/";      // note trailing slash

$images = glob($dir . "*.{jpg,JPG,jpeg,png,webp}", GLOB_BRACE);

header('Content-Type: application/json');
echo json_encode($images);
?>