const config = {
    PORT: 8080,
    MQTT_BROKER_IP: 'test.mosquitto.org',
    MQTT_BROKER_PORT: 1883,
    MANAGER_SERVER_ADDRESS: 'http://localhost:3002',
    WS_TOPICS: ['bulb/sensor_status', 'plug/sensor_status', 'door/sensor_status', 'motion/sensor_status', 'airmonitor/sensor_status']
}


module.exports = config