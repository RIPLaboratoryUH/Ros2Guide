## System Architecture

The IIR software can be complicated. This will be a full description of the software components in use.
The Main nodes are nessescary nodes to drive the robot around manaually.
The Navigation support nodes are used to support the NAV2 package
NAV2 is a large package with many sub-packages. I have described it in detail [here]
### Components

- ROS2 Nodes (MAIN)
  - Robot State Publisher
    - This node will spin up the URDF and manage the transform tree.
  - Joint State Publisher
    -This node will manage the transform tree for the URDF, giving us an accurate representation of the robots state to give to other nodes.
  - Ros2 Control
    - This node will manage the hardware interface provided by the ros_odrive package. This will calculate odometry, publish transforms, and accept velocity commands from `/diff_drive_controller/cmd_vel`. 

-NAV2 Support Nodes
  - NAV2 Commander
    -Gives an API to write scripts to tell the robot to drive to setpoints or patrol a route. I use this to do the 'lawn-mowing' routine.
  - URG_node
    - This node proccesses raw data from our lidar and publishes `/scan` which contains an array with the lidar data. Note that this node does not do any calculation with the Lidar information.
  - slam_toolbox
    - This node takes in the scan data, alongside our odometry and creates a localization estimate, as well as a costmap of the environment. The localization estimate is shown as a "world" transform. NAV2 relies on this node to plan a safe route through an environment.  
    - https://www.youtube.com/watch?v=ZaiA3hWaRzE
    - https://docs.ros.org/en/jazzy/p/slam_toolbox/



- RPI Periphery
  - Camera
  - CAN-Bus Adapter
  - Fans
- ODrive 