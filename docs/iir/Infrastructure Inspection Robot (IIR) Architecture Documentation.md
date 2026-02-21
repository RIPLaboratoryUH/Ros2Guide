## System Architecture

The IIR software can be complicated. This will be a full description of the software components in use. Also, this is largely a WIP, so take information with a grain of salt.
The Main nodes are necessary nodes to drive the robot around manually, and will calculate odometry.
The Navigation support nodes are used to support the NAV2 package
NAV2 is a large package with many sub-packages. I have described it in detail [here]

### Components
- ROS2 Nodes (MAIN)
  - Robot State Publisher
    - This node will spin up the URDF and manage the transform tree.
  - Joint State Publisher
    - This node will manage the transform tree for the URDF, giving us an accurate representation of the robots state to give to other nodes.

  - Ros2 Control
    - This node will manage the hardware interface provided by the ros_odrive package. This will calculate odometry, publish transforms, and accept velocity commands from `/diff_drive_controller/cmd_vel`. For more information on interfacing with the Odrives, see the HW section below.
  - micro-ros-agent
    - A microcontroller hardware interface. Reads sensor data from the Teensy. Specifically, IMU information. For more on micro-ros go [here].
  - robot_localization
    - Fuses together our odometry estimate with both IMUs, using an EKF. 

- NAV2 Support Nodes
  - NAV2 Commander
    - Gives an API to write scripts to tell the robot to drive to setpoints or patrol a route. I use this to do the 'lawn-mowing' routine.
  - URG_node
    - This node processes raw data from our lidar and publishes `/scan` which contains an array with the lidar data. Note that this node does not do any calculation with the Lidar information.
  - slam_toolbox
    - This node takes in the scan data, alongside our odometry and creates a localization estimate, as well as a costmap of the environment. The localization estimate is shown as a "world" transform. NAV2 relies on this node to plan a safe route through an environment.  
    - For a look at how slam_toolbox works and how to use it: https://www.youtube.com/watch?v=ZaiA3hWaRzE
    - https://docs.ros.org/en/jazzy/p/slam_toolbox/
  - depth_camera_proc 
    - Takes live depth data from the depth sensor, converts that data into a `/scan` topic, which can be processed by slam_toolbox in a similar manner as the urg node

  <!-- INSERT NODE GRAPH IMAGE HERE -- HIGHLIGHT SPECIFIC PARTS TO SHOW DATA FLOW -->

- RPI Periphery
  - Camera
    - Regular camera for general vision-sensing purposes. We don't do anything complicated with this at the moment.
  - Depth Camera
    - Depth-sensing gives us an estimate of how far the ground/other objects are from the robot. This can be used to generate a map of the environment 
  - CAN-Bus Adapter
    - The CAN bus is the primary method of communication with our motor controllers, the odrives. for more information on CAN-bus and how the odrive uses it, see below links. This USB device allows us to communicate with the odrives using the can-bus.
    - 
  - Fans
    - Powered using fan pins on RPI5. Simple as.
- ODrive 
  - We use the ODrive Pros as motor controllers. There are many ways to interface with them, and in the past we used a micro-ros agent -> Teensy microcontroller -> can-bus system. This gave us issues with data transmission. Bringing the CAN-bus onto the RPI allowed us to use R2C to its full effect. R2C helps as it handles odom calculations, Twist->motor control calculations, and exposes everything as topics for us to introspect easily. 