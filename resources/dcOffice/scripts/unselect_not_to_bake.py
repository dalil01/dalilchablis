import bpy

notToBake = [
    "outside", "windows", 
    "circle", "cross", "square", "triangle",
    "pacman.001", "pacman.002", "pacman.003", "pacman.004",
    "led.001", "led.002", "led.003", "led.004", "led.005", "led.006", "led.007", "led.008", "led.009", "led.010", "led.011", "led.012",
    "cactus",
    "about", "contact", "education", "experience", "projects", "skills"
]

for collection in bpy.data.collections:
    if collection.name == "Extras":
        continue

    for obj in collection.objects:
        if obj.type == "MESH" and obj.name.lower() in notToBake:
            obj.hide_select = True