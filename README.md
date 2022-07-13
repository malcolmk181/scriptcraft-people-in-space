# Scriptcraft-people-in-space
A ScriptCraft script for displaying the current people in space in the Minecraft chat.

## Requirements
This script is written & tested for Minecraft 1.14.4 & Java 11. It will probably *not* work on any version of Minecraft newer than 1.15. It *may* work on versions of Minecraft older than 1.14, but I have **not** tested this.

The script takes advantage of Java 11's [Nashorn](https://docs.oracle.com/en/java/javase/11/nashorn/introduction.html) JavaScript engine to submit a GET request to the Open-notify API.

## Installation
Simply put the script in your `server-directory/scriptcraft/scripts` directory.

## Usage
This script provides a command `/jsp people-in-space` to all users. It does not require `op` permissions.
