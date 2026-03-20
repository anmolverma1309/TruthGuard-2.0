/**
 * WebUSB + Arduino Pendrive Detection
 * Utility to monitor hardware security events.
 */

export const ARDUINO_VENDOR_ID = 0x2341; // Standard Arduino VID

/**
 * Requests access to a USB device
 */
export async function requestUsbAccess() {
    try {
        const device = await navigator.usb.requestDevice({
            filters: [{ vendorId: ARDUINO_VENDOR_ID }]
        });
        return {
            device: device.productName || "USB Detected",
            status: "CONNECTED",
            vendorId: device.vendorId,
            productId: device.productId
        };
    } catch (error) {
        console.error("USB Access Denied:", error);
        return null;
    }
}

/**
 * Listens for hardware connection events
 */
export function setupUsbListeners(onConnect, onDisconnect) {
    if (!navigator.usb) {
        console.warn("WebUSB not supported in this browser.");
        return;
    }

    navigator.usb.addEventListener("connect", (event) => {
        console.log("USB Device Connected:", event.device);
        onConnect({
            device: event.device.productName || "USB Detected",
            status: "CONNECTED"
        });
    });

    navigator.usb.addEventListener("disconnect", (event) => {
        console.log("USB Device Disconnected:", event.device);
        onDisconnect({
            device: event.device.productName || "USB Detected",
            status: "DISCONNECTED"
        });
    });
}
