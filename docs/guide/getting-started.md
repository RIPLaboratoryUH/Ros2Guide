# Getting Started with ROS2

Welcome to the ROS2 Knowledge Map! The goal of this document is to give a newcomer to ROS2 the tools they need to learn to start their journey of becoming a ROS2 developer. 

When I first started, I had no idea where to look for more information on certain topics, or what I should focus on next after learning a concept. I want to give a clear path to all you new developers so you can learn in a few weeks what I learned in a year. 

Alternatively, if you are a mechanical engineer, and just trying to understand the basics of ROS2, this document will still be helpful, but all of the links may not pertain to you.  Check out the Quick Start page for the bare minimum information.

## How to Use This Guide

Take your time absorbing everything. There will be a lot of information here, so feel free to take breaks, come back to difficult topics, or check out the [Glossary] page to find definitions of words.

Due to the open-source aspect of ROS2, most of the important information about developing and using it already exists and is free to access! 

The information present in this guide will generally be presented in the form of links to other sites.
 <!-- Links presented *like so* are vital curriculum! There may be other links that are extraneous or are good to know but not essential. These will be presented **like so**. -->


## Robot... Operating System?
To start, let's answer the question of what ROS2 **is**. ROS stands for Robot Operating System, which can be confusing to people with backgrounds in computing, let me explain. In the computing world, an operating system refers specifically to the low-level software controlling your computer. For example, it interprets your keyboard presses as specific characters, then tells your word processor to draw the corresponding character. This is nice because then we do not need to be very involved with these repetitive, menial tasks. Examples of operating systems include Windows, Ubuntu, MacOS, and even Android. Each of these completely define the experience of using your device, and installing different OSes give you totally unique functionality and use. The operating system operates at the lowest layer between the physical CPU and you. 
Given this, and the name, you may believe ROS2 is a traditional operating system. You would not be alone in this. The naming is slightly unfortunate and confusing. ROS2 does not operate at the same layer as a traditional OS, and in fact, is used more like a traditional program, such as a browser (albeit, slightly more complicated, but we'll circle back to that). So your machine is "running" Ubuntu, but has ROS2 installed on top of it. ROS2 does not completely control your computer's hardware to interpret keyboard commands, Ubuntu is still in charge of that. The reason why ROS2 is called Robot Operating System is because it is the primary layer between you (i.e the computer running ROS2) and the robot's hardware. This means that ROS2 provides capability to do things like motor control, odometry calculation and sensor readings, in real-time. ROS2 is awesome because it provides many tools that make interprocess communication easy, as well as providing a general framework that many people can use in different situations. Having knowledge of how ROS2 works on one robot will give you a general idea of how most other robots using ROS2 operate.



## The command line



