<?php
$apiKey = 'AIzaSyCXwXYwHNzOuV6JeWSkXOHdsLyhcNkg_Tg';
$pickup = $_POST['pickup'];
$dropoff = $_POST['dropoff'];

$url = "https://maps.googleapis.com/maps/api/distancematrix/json?origins=" . urlencode($pickup) . "&destinations=" . urlencode($dropoff) . "&mode=driving&key=" . $apiKey;

$resp = file_get_contents($url);
$data = json_decode($resp, true);

if ($data['status'] == 'OK' && $data['rows'][0]['elements'][0]['status'] == 'OK') {
    echo json_encode([
        'status' => 'success',
        'distance' => $data['rows'][0]['elements'][0]['distance']['text'],
        'travel_time' => $data['rows'][0]['elements'][0]['duration']['text']
    ]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Unable to calculate route.']);
}
?>