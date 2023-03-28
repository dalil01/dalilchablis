import bpy

for collection in bpy.data.collections:
    if collection.name == "Extras":
        continue

    collection.hide_select = False

    for obj in collection.objects:
        if obj.type == "MESH":
            obj.hide_select = False