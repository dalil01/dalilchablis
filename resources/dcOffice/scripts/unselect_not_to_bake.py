import bpy

notToBake = [
    "outside.001", "windows.001", 
    "circle.001", "cross.001", "square.001", "triangle.001",
    "pacman.001", "pacman.002", "pacman.003", "pacman.004",
    "led.001", "led.002", "led.003", "led.004", "led.005", "led.006", "led.007", "led.008", "led.009", "led.010", "led.011", "led.012",
    "cactus.002",
    "table 1 glass.001", "table 2 glass.001",
    "about.001", "contact.001", "education.001", "experience.001", "projects.001", "skills.001"
]

for collection in bpy.data.collections:
    if collection.name == "Extras":
        continue

    for obj in collection.objects:
        if obj.type == "MESH" and obj.name.lower() in notToBake:
            obj.hide_select = True