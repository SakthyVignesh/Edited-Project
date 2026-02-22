<?php
echo "<h1>FlashAPI Data Viewer</h1>";
echo "<p>This page displays the data stored in your project's JSON files.</p>";

$dataDir = __DIR__ . '/data';

if (is_dir($dataDir)) {
    $files = glob($dataDir . '/*.json');
    
    foreach ($files as $file) {
        $filename = basename($file);
        $content = file_get_contents($file);
        $data = json_decode($content, true);
        
        echo "<h2>" . htmlspecialchars($filename) . "</h2>";
        echo "<pre style='background: #f4f4f4; padding: 10px; border: 1px solid #ddd; border-radius: 5px;'>";
        print_r($data);
        echo "</pre>";
    }
} else {
    echo "<p style='color: red;'>Data directory not found!</p>";
}
?>
