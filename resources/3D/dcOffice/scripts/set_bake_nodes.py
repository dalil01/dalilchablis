import bpy

baked_hdr_path = r"/resources/dcOffice/dcOffice-light.baked.hdr"

if "dcOffice-light.baked.hdr" in bpy.data.images:
    baked_hdr = bpy.data.images.get("dcOffice-light.baked.hdr")
else:
    baked_hdr = bpy.data.images.load(baked_hdr_path)

for obj in bpy.context.scene.objects:
    if obj.type == 'MESH' and obj.material_slots:
        for slot in obj.material_slots:
            if (slot.material):
                for node in slot.material.node_tree.nodes:
                    if node.type == 'TEX_IMAGE':
                        hasInputLink = False
                        hasOutputLink = False

                        for input in node.inputs:
                            if input.links:
                                hasInputLink = True
                                break
                        for output in node.outputs:
                            if output.links:
                                hasOutputLink = True
                                break

                        if not hasInputLink and not hasOutputLink:
                            node.image = baked_hdr
                            node.select = True
                            bpy.context.view_layer.update()
                            # print(node.image)
