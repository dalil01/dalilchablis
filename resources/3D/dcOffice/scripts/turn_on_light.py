import bpy

for collection in bpy.data.collections:
    for obj in collection.objects:
        if obj.name.lower() == "light":
            obj.data.energy = 200
            break
