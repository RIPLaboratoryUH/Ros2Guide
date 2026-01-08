# NetworkManager CLI (nmcli) - WiFi Management Guide

## Basic Commands

### List Available WiFi Networks
```bash
nmcli dev wifi list
```

### List Saved Connections
```bash
nmcli connection show
```

### Check Active Connections
```bash
nmcli connection show --active
```

## Connecting to WiFi Networks

### Connect to a Network
```bash
# With password
sudo nmcli device wifi connect "SSID" password "YOUR_PASSWORD"

# Open network (no password)
sudo nmcli device wifi connect "SSID"
```

### Manually Switch Between Saved Networks
```bash
# Connect to a specific saved network
sudo nmcli connection up "CONNECTION_NAME"

# Disconnect from current network
sudo nmcli connection down "CONNECTION_NAME"
```

## WiFi Failover Configuration

### Set Connection Priorities
Higher priority number = more preferred network
```bash
# Set primary network (highest priority)
sudo nmcli connection modify "riplab" connection.autoconnect-priority 100

# Set fallback network (lower priority)
sudo nmcli connection modify "UHM" connection.autoconnect-priority 50

# Enable auto-connect for both
sudo nmcli connection modify "riplab" connection.autoconnect yes
sudo nmcli connection modify "UHM" connection.autoconnect yes
```

NetworkManager will automatically:
- Try highest priority network first
- Fall back to lower priority if unavailable
- Switch back to higher priority when it becomes available

### Verify Priority Settings
```bash
nmcli connection show riplab | grep autoconnect-priority
nmcli connection show UHM | grep autoconnect-priority
```

## Temporarily Disable/Enable Networks

### Disable Auto-Connect (without deleting)
```bash
# Disable riplab (will use UHM even if riplab is available)
sudo nmcli connection down riplab
sudo nmcli connection modify riplab connection.autoconnect no
```

### Re-enable Auto-Connect
```bash
sudo nmcli connection modify riplab connection.autoconnect yes
sudo nmcli connection up riplab
```

## Quick Toggle Script

Create a script to switch between two networks:
```bash
#!/bin/bash
# Save as ~/toggle-wifi.sh

if nmcli connection show --active | grep -q "riplab"; then
    echo "Switching to UHM..."
    sudo nmcli connection down riplab
    sudo nmcli connection modify riplab connection.autoconnect no
    sudo nmcli connection up UHM
else
    echo "Switching to riplab..."
    sudo nmcli connection modify riplab connection.autoconnect yes
    sudo nmcli connection up riplab
fi
```

Make it executable:
```bash
chmod +x ~/toggle-wifi.sh
```

## Understanding Connection Names

- **SSID**: The WiFi network name you see when scanning
- **Connection Name**: NetworkManager's saved name (may differ from SSID)
  - Example: SSID "UHM" might have connection name "netplan-wlan0-UHM"
- Always use the **connection name** from `nmcli connection show` for modify commands

## Checking Network Configuration

### View Connection Details
```bash
nmcli connection show "CONNECTION_NAME"
```

### Check Netplan Renderer
```bash
cat /etc/netplan/00-default-nm-renderer.yaml
```

If it shows `renderer: NetworkManager`, use `nmcli` commands for WiFi management.

## Example Output Interpretation
```bash
$ nmcli connection show
NAME                UUID                                  TYPE      DEVICE     
riplab              7c08ff97-0057-419d-b068-f112ccb83cae  wifi      wlan0      
UHM                 20eecf45-f48a-4d4b-ac64-ed425a86df7e  wifi      --         
tailscale0          d3187d84-3ac0-4fca-a45f-1b4d96762849  tun       tailscale0 
```

- **DEVICE = wlan0**: Currently connected
- **DEVICE = --**: Saved but not active
- **TYPE = wifi**: WiFi connection
- **TYPE = tun**: VPN/tunnel connection (like Tailscale)o nmcli con
