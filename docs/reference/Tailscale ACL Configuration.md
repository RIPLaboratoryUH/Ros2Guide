# Tailscale ACL Configuration - Restrict Device to SSH Only

## Problem
Limit a specific Tailscale device to only allow SSH traffic (port 22) to reduce load and prevent random disconnections.

## Solution: Configure Tailscale ACLs

### Step 1: Edit Tailscale ACLs

Go to Tailscale admin console:
```
https://login.tailscale.com/admin/acls
```

### Step 2: Add ACL Configuration

Add this to your ACL policy file:
```json
{
  "tagOwners": {
    "tag:ssh-only": ["autogroup:admin"]
  },
  
  "acls": [
    {
      // Only allow SSH (port 22) to tagged devices
      "action": "accept",
      "src": ["autogroup:member"],
      "dst": ["tag:ssh-only:22"]
    }
    // No other rules = everything else is denied by default
  ],
  
  "ssh": [
    {
      // Enable Tailscale SSH for tagged devices
      "action": "accept",
      "src": ["autogroup:member"],
      "dst": ["tag:ssh-only"],
      "users": ["autogroup:nonroot", "root"]
    }
  ]
}
```

### Step 3: Tag the Target Device

On the device you want to restrict (e.g., `rippi5-02`):
```bash
sudo tailscale up --advertise-tags=tag:ssh-only --ssh
```

### Step 4: Verify Configuration
```bash
# Check Tailscale status
tailscale status

# Verify SSH works (from another Tailscale device)
ssh rippi5-02

# Test that other ports are blocked (should timeout/fail)
curl http://rippi5-02:80
nc -zv rippi5-02 443
```

## What This Does

- ✅ **SSH (port 22)**: Allowed over Tailscale
- ❌ **All other ports**: Blocked over Tailscale  
- ✅ **Local network**: Unaffected - other applications can still use local networking
- ✅ **Tailscale overhead**: Minimized - only SSH traffic uses Tailscale

## More Restrictive ACL (Optional)

For explicit denial of all non-SSH traffic:
```json
{
  "tagOwners": {
    "tag:ssh-only": ["autogroup:admin"]
  },
  
  "acls": [
    {
      // Allow SSH to tagged device
      "action": "accept",
      "src": ["autogroup:member"],
      "dst": ["tag:ssh-only:22"],
      "proto": "tcp"
    },
    {
      // Explicitly deny everything else to this device
      "action": "accept",
      "src": ["*"],
      "dst": ["tag:ssh-only:*"]
    }
  ],
  
  "ssh": [
    {
      "action": "accept",
      "src": ["autogroup:member"],
      "dst": ["tag:ssh-only"],
      "users": ["autogroup:nonroot", "root"]
    }
  ]
}
```

## Key Concepts

### Tags
- Tags are used to group devices with similar policies
- Format: `tag:name`
- Must be defined in `tagOwners` before use

### ACL Structure
- `src`: Source of traffic (who can connect)
- `dst`: Destination (device:port)
- `action`: "accept" or "deny"
- `proto`: Protocol (tcp, udp, icmp, or * for all)

### Common Source Groups
- `autogroup:member`: All users in your tailnet
- `autogroup:admin`: Tailnet admins only
- `*`: Everyone (all sources)

### Port Syntax
- `device:22`: Specific port (SSH)
- `device:*`: All ports
- `device:80,443`: Multiple specific ports

## Apply Tags to Multiple Devices

If you want to restrict multiple devices:
```bash
# On each device
sudo tailscale up --advertise-tags=tag:ssh-only --ssh
```

Or apply tags from the admin console:
1. Go to Machines page
2. Click on device
3. Edit machine → Add tags

## Remove Restriction

To remove the SSH-only restriction:
```bash
# Remove the tag
sudo tailscale up --advertise-tags=

# Or in admin console: remove the tag from the device
```

## Benefits

1. **Reduced bandwidth**: Only SSH traffic uses Tailscale
2. **Better stability**: Less load may prevent disconnections
3. **Security**: Explicit control over what ports are accessible
4. **Flexibility**: Other services can use different networking (WiFi, ethernet, etc.)
