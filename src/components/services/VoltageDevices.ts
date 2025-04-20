import axios from "axios"

export interface DeviceInfo {
  codename: string
  maintainer: string
  oem: string
  device?: string
  filename: string
  download: string
  timestamp: number
  md5: string
  size: number
  version: string
  error: string
}

/**
 * Fetches the list of VoltageOS device codenames
 * @returns Promise resolving to an array of device codenames
 */
export const fetchDeviceList = async (): Promise<string[]> => {
  try {
    const response = await axios.get<string>(
      "https://raw.githubusercontent.com/VoltageOS/vendor_voltage/refs/heads/15-qpr2/voltage.devices",
    )

    // Parse the device list, ignoring lines that start with "#"
    return response.data
      .split("\n")
      .filter((line) => line.trim() && !line.trim().startsWith("#"))
  } catch (error) {
    console.error("Error fetching device list:", error)
    throw new Error("Failed to fetch device list")
  }
}

/**
 * Fetches data for a specific device
 * @param device Device codename
 * @returns Promise resolving to the device information
 */
export const fetchDeviceData = async (device: string): Promise<DeviceInfo> => {
  try {
    const response = await axios.get(
      `https://raw.githubusercontent.com/VoltageOS/android_vendor_voltageota/refs/heads/15-qpr2/${device}.json`,
    )
    return { codename: device, ...response.data.response[0] }
  } catch (error) {
    console.error(`Failed to fetch data for device ${device}:`, error)
    return {
      codename: device,
      maintainer: "",
      oem: "",
      filename: "",
      download: "",
      timestamp: 0,
      md5: "",
      size: 0,
      version: "",
      error: `Failed to fetch data for ${device}`,
    }
  }
}

/**
 * Fetches data for all VoltageOS devices
 * @returns Promise resolving to an array of device information
 */
export const fetchAllDevicesData = async (): Promise<DeviceInfo[]> => {
  try {
    // Get the list of device codenames
    const deviceList = await fetchDeviceList()

    // Fetch data for each device in parallel
    const devicePromises = deviceList.map((device) => fetchDeviceData(device))
    const devicesData = await Promise.all(devicePromises)

    // Filter out devices with errors
    return devicesData
      .filter((device) => !device.error)
      .sort((a, b) => b.timestamp! - a.timestamp!) // Sort by timestamp
  } catch (error) {
    console.error("Error fetching all device data:", error)
    throw new Error("Failed to fetch device data")
  }
}
