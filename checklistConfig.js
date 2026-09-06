// =====================================
// GFC VALIDATION CHECKLIST MASTER
// =====================================

const CHECKLIST_CONFIG = {

    demolition: {
        drawingLevel : "ROOM",
        checklist:
        [

        "Demolition Area Clearly Demarcated in Plan",
        "Demolition Area Celarly demarcated in Elevation",
        "Structural Walls marked in the Plan",
        "Wall Opening Locations Shown with dimensions",
        "Demolition Dimensions Mentioned",
        "Demolition Method Mentioned",
        "Post Demolition Finishing Mentioned"

    ]
    },

    skirting_demolition: {
        drawingLevel : "FULL_HOME",
        checklist:
        [

        "Skirting Area Clearly Demarcated in Plan",
        "Post Demolition Finishing Mentioned"

    ]
    },

    new_wall_without_opening: {
        drawingLevel : "FULL_HOME",
        checklist:[
        "New Wall Locations Shown in plan",
        "Wall Thickness Mentioned",
        "Wall Length Mentioned",
        "Wall Height Mentioned"
    ]},
    
 new_wall_with_opening: {
        drawingLevel : "ROOM",
        checklist:[

        "New Wall Locations Shown in plan",
        "Wall Thickness Mentioned",
        "Wall Length Mentioned in elevation",
        "Wall Height Mentioned in elevation",
        "Opening location dimensions shown",
        "Opening Dimensions Mentioned in elevation",
        "Lintel Details Mentioned with dimensions",
        "Wall finishing mentioned",
        "Core Cutting shown/Coordinates Mentioned"

    ]},




     CoreCutting: 
     {
         drawingLevel : "ROOM",
        checklist: [

        "Core cutting shown on elevation with size",
        "Core Cutting xy Co-ordinates shown",
        "Core cutting in LS or Cx Scope mentioned"
    ]},


    flooring_fullhome: 
    { drawingLevel : "FULL_HOME",
        checklist:[

        "Flooring Grid plan shown with dimensions",
        "Skirting Layout plan shown with dimensions with skirting location",
        "Flooring Type shown with legends(Tile/Stone etc)",
        "Floor Tile Start Point Mentioned",
        "Floor Tile/Stone Size Mentioned",
        "Slope Direction Mentioned",
        "Any floor level drop mentioned",    
        "Skirting height Mentioned",
        "Skirting type mentioned(flush/nonflush)",
        "Grouting Details Mentioned"

    ]},

     flooring_roomwise: 
    { drawingLevel : "ROOM",
        checklist:[

        "Flooring Grid plan shown with dimensions",
        "Skirting Layout plan shown with dimensions with skirting location",
        "Flooring Type shown with legends(Tile/Stone etc)",
        "Floor Tile Start Point Mentioned",
        "Floor Tile/Stone Size Mentioned",
        "Slope Direction Mentioned",
        "Any floor level drop mentioned",  
        "Skirting height Mentioned",
        "Skirting type mentioned(flush/nonflush)",
        "Grouting Details Mentioned"

    ]},


    
pcc_fullhome:
{drawingLevel: "FULL_HOME",
    checklist:[

        "PCC areas marked on plan with dimensions",
        "Level Difference Marked(if any)",
        "PCC thickness mentioned"

    ]
},

pcc_roomwise:
{drawingLevel: "ROOM",
    checklist:[

        "PCC areas marked on plan with dimensions",
        "Level Difference Marked(if any)",
        "PCC thickness mentioned"

    ]
},    
    
    
    coba:
    {drawingLevel : "ROOM",
        checklist:[

        "Brickbat areas marked on plan with dimensions",
        "Level Difference Marked(if any)",
        "Brickbat thickness mentioned"

    ]},

    plaster_fullhome: 
        {drawingLevel : "FULL_HOME",
        checklist : [
        "Plaster areas marked on plan with dimensions",
        "Plaster areas marked on elevation with dimensions",
        "Plaster type mentioned",
        "Plaster thickness mentioned"

    ]},
    
 plaster_roomwise: 
        {drawingLevel : "FULL_HOME",
        checklist : [
        "Plaster areas marked on plan with dimensions",
        "Plaster areas marked on elevation with dimensions",
        "Plaster type mentioned",
        "Plaster thickness mentioned"

    ]},

    
       punning_normal_fullhome: 
       {drawingLevel : "FULL_HOME",
           checklist : [

        "Punning areas marked on plan with dimensions",
        "Punning type mentioned",
        "Punning thickness mentioned"

    ]},

      punning_normal_roomwise: 
       {drawingLevel : "ROOM",
           checklist : [

        "Punning areas marked on plan with dimensions",
               "Punning type mentioned",
        "Punning thickness mentioned"

    ]},

     punning_design_roomwise:
         
       {drawingLevel : "ROOM",
           checklist : [
        "Punning areas marked on elevation with dimesions(for grooves design)",
        "Punning areas marked on elevation with dimesions(for other design)",       
        "Punning grooves c/c dimension mentioned with xy coordinates",
        "Curvature grooves radius and dimension mentioned",    
        "Dimensions mentioned with xy coordinates for any other design including any curvature radius",
        "Punning type mentioned",
        "Punning thickness mentioned"

    ]},

    
     waterproofing:
     {drawingLevel : "ROOM",
      checklist :
         [

        "Waterproofing areas marked on plan with dimensions",
        "Waterproofing areas marked on elevation with dimensions",
        "Waterproofing type mentioned",
        "Waterproofing specifications mentioned"

    ]},

    
    walltiling: {
        drawingLevel : "ROOM",
        checklist:
        [

        "Dado Grid elevation as per tile size with dimensions",
        "Tile Start Point Mentioned",
        "Tile Size Mentioned",
        "Cutouts Shown/marked",
        "Cutout Dimensions Mentioned",
        "Tile Area Dimensions Mentioned",
        "Grouting Details Mentioned"

]},
    
    wallcladding: 
        {drawingLevel : "ROOM",
         checklist :[

        "Wall Cladding Elevation shown with dimensions",
        "Tile Size Mentioned",
        "Cutouts Shown/marked",
        "Cutout Dimensions Mentioned",
        "Tile Area Dimensions Mentioned"

    ]},

    falseCeiling_fullhome: 
    {drawingLevel : "FULL_HOME",
     checklist : 
        [

        "Ceiling plan Layout shown with clear dimensions",
        "Any curvature , radius and dimension is showm",
        "False Ceiling type mentioned with Legends (gypsum/POP/grid/pvc etc)",
        "Ceiling Sections shown: horizontal & vertical cuts with clear dimensions and drop",
        "False Ceiling levels/drops Mentioned on plan and matches with the legends", 
        "Band Size Mentioned with clear dimension",
        "Cove Width and section shown with clear dimensions",
        "Cove levels Mentioned on plan and matches with legends",
        "Beam Locations hatch Shown ",
        "Wardrobe height clash checked",
        "AC location shown",
        "AC pelmet/pocket marked with clear dimensions",
        "Curtain Pelmet/pocket marked with clear dimensions"

    ]},

    Pelmet: [

        "AC/Curtain Pelmet elevation shown with clear dimensions",
        "AC/Curtain Pelmet Section shown with drop/cove dimensions",
        "AC/Curtain Pelmet distance from FFL shown",
        "AC/Curtain pelmet shown with dimensions",
        "AC/Curtain pocket shown"

    ],

    electricalWall: [
        
        "New modules Shown in elevation with clear location xy coordinates",
        "Relocation modules shown in elevation with clear location xy coordinates",
        "Existing modules Shown in elevation with clear xy coordinates",
        "Module name and configuration Mentioned with socket(5A/15A)",
        "All Fixtures(lights etc) shown in elevation with xy coordinates",
        "Unique Legend and nomenclature shown for new/relocated/existing boards",
        "Primary and secondary Looping Shown in elevation for wall points/fixtures(lights etc)",
        "Looping Layout Shown for New modules",        
        "Conduit Routing Shown for New and Relocation modules(from nearest board or junction box)",
        "Unique Legend and nomenclature shown for light points",
        "Trims design/moulding clash checked",
        "Modular unit/product clash checked",
        "Loose Furniture Clash Checked",
        "RCC clash checked",
        "Accessibility for wiring Checked"

    ],

    electricalCeiling_lights_fullhome:
    {drawingLevel : "FULL_HOME",
     checklist :
        [
        "New light Fixtures shown in layout in plan",
        "Existing light Fixtures relocations shown(if any) shown in plan",
        "Light dimension with nearby fan/utilities Shown in plan",
        "Modules shown in the plan layout for looping along with 5/15 Amp socket(s)",
        "Primary Looping Shown with modules with color code",
        "Secondary Looping Shown with primary points with color code",
        "Cove light/track light/profile light clear dimensions shown",
        "Cove light/track light/profile light xy coordinate shown",
        "Cove light shown in the false ceiling section",
        "Light fixture xy cooridinates shown",
        "Light Fixture c/c Spacing and xy coordinates mentioned",
        "Sprinklers route and smoke detector shown and clash checked(if any)",  
        "Wardrobe area hatch shown and clash checked",
        "Bed location /area hacth shown and clash checked",
        "Fan & light clash checked for shodow effect",
        "All Fixture Legend shown"

    ]},

     electricalCeiling_fan_fullhome:
    {drawingLevel : "FULL_HOME",
     checklist :
        [
        "Fan(s) xy co-ordinates location and blade diameter shown in plan",
         "Existing Fan relocation shown with color codes with dimensions",   
        "Fan(s) Looping Shown with modules with color code in plan"
        "Fan dimension with nearby lights/utilities Shown in plan",
        "Wardrobe area hatch shown and clash checked in plan",
        "Bed or loose furniture location /area hacth shown and clash checked",
        "Fan & nearby light clash checked for shodow effect",
        "All Fixture Legend shown"

    ]},


    
    kitchenplumbing:{
        drawingLevel : "ROOM",
        checklist : [

        "Plan Layout shown with dimensions",
        "Elevation Layout shown with dimensions",
        "Legend Available",
        "Existing Points shown with xy coordinates",
        "New Points shown with xy co-ordinates",
        "Relocated Points shown with xy co-ordinates",
        "Fixture Locations shown with xy co-ordinates",
        "Drain Points Shown on plan wiyh xy co-ordinats",
        "Waterproofing area Shown on floor and wall"

    ]},
    
     bathroomplumbing: {
         drawingLevel : "ROOM",
         checklist : [

        "Plan Layout shown with dimensions",
        "Elevation Layout shown with dimensions",
        "Legend Available",
        "Existing Points shown with xy coordinates",
        "New Points shown with xy co-ordinates",
        "Relocated Points shown with xy co-ordinates",
        "Fixture Locations shown with xy co-ordinates",
        "Drain Points Shown on plan wiyh xy co-ordinats",
        "Waterproofing area Shown on floor and wall",
        "Shower cubicle clash checked",
        "Vanity/furniture clash checked",
        "Fixture heights are as per interior standards"

    ]},

    painting_fullhouse:{
        drawingLevel : "FULL_HOUSE",
        checklist :
        [

        "Paint Layout shown in plan with dimensions",
        "Elevation Layout Available",
        "Paint Area Identified",
        "Paint type  specification/type Mentioned",
        "Geometric/multicolor/block paint elevation shown with dimensions",
        "Texture paint elevation shown with dimensions"

    ]},
 painting_roomwise:{
        drawingLevel : "FULL_HOUSE",
        checklist :
        [

        "Paint Layout shown in plan with dimensions",
        "Elevation Layout Available",
        "Paint Area Identified",
        "Paint type  specification/type Mentioned",
        "Geometric/multicolor/block paint elevation shown with dimensions",
        "Texture paint elevation shown with dimensions"

    ]},


    
    cat3:{
        drawingLevel  : "ROOM",
        checklist :[

        "Product Layout Available",
        "Elevation Available",
        "Procurement Source Mentioned",
        "Product Code Mentioned",
        "Material Specification Mentioned",
        "Dimensions Mentioned",
        "Installation Details Available",
        "Accessory Details Available"

    ]},


    // =====================================
    // NEW DOOR / DOOR REFURBISHMENT
    // =====================================

    Doors: 
    {drawingLevel : "ROOM",
        checklist :[

        "Plan Available with location shown in furniture layout",
        "Front and back Elevation Available",
        "All Section Available",
        "Door L X H mentioned",
        "Any Design on door, dimensions provided(Like trims,grooves,tpatti,moulding, grills etc)",
        "Frame type and dimensions Mentioned",
        "Opening Side Shown",
        "Door frame panelling dimensions and details shown (elevation and section, as applicable)",
        "Material types Mentioned for door and design elements",
        "Door Thickness Mentioned",
        "Handle location Mentioned",
        "Handle specification Mentioned",
        "All Accessories Mentioned(like door closer,Locks, tower bolt etc) ",
        "Finish Type Mentioned for door along with design elements mentioned",
        "Finish Code Mentioned",
        "Accesibility checked (not clashing with existing furniture, fixtures or creating space constraints)"
    ]},

    // =====================================
    // SLIDING DOOR
    // =====================================

    slidingDoor: {drawingLevel : "ROOM",
        checklist :[

        "Plan Available with location shown in furniture layout",
        "Front and back Elevation Available",
        "All Section Available, moving and fixed",
        "L X H mentioned",
        "Any Design on door, dimensions provided(Like trims,grooves,tpatti,moulding, grills etc)",
         "Track location shown",
         "Hardware details mentioned, tracks, channel",
        "Opening direction Shown",
        "Material types Mentioned for door and design elements",
        "Door Thickness Mentioned",
        "Handle location Mentioned",
        "Handle specification Mentioned",
        "All Accessories deatils Mentioned(like door closer,Locks, tower bolt etc) ",
        "Finish Type Mentioned for door along with design elements mentioned",
        "Finish Code Mentioned",
        "Accesibility checked (not clashing with existing furniture, fixtures or creating space constraints)",
         "Glass Type Mentioned",
        "Glass Thickness Mentioned",
        "Glass Colour Mentioned"

    ]},

    // =====================================
    // UPVC WINDOW
    // =====================================

    upvcWindow: {drawingLevel : "ROOM",
        checklist :[

        "Elevation Available",
        "Section Available",

        "Track Quantity Mentioned",

        "Window Width Mentioned",
        "Window Height Mentioned",

        "Opening Direction Mentioned",

        "Panel Quantity Mentioned",

        "Glass Type Mentioned",
        "Glass Thickness Mentioned",
        "Glass Colour Mentioned",

        "UPVC Profile Mentioned",

        "Accessories Mentioned"

    ]},

    // =====================================
    // ALUMINIUM WINDOW
    // =====================================

    aluminiumWindow: {drawingLevel : "ROOM",
        checklist :[

        "Elevation Available",
        "Section Available",

        "Track Quantity Mentioned",

        "Window Width Mentioned",
        "Window Height Mentioned",

        "Opening Direction Mentioned",

        "Panel Quantity Mentioned",

        "Glass Type Mentioned",
        "Glass Thickness Mentioned",
        "Glass Colour Mentioned",

        "Aluminium Profile Mentioned",

        "Accessories Mentioned"

    ]},

    // =====================================
    // SHOE STORAGE
    // =====================================

    shoeStorage: {drawingLevel : "ROOM",
        checklist :[

        "Plan Available with location shown in furniture layout",
        "Elevation Available",
        "Front and side Section Available (external and interal elevations)",
        "L x H X D mentioned",
        "Shutter details shown along with opening side and details of design elements(as applicable)",
        "Internal Layout shown with dimensions (of shelves, drawers, partiitons etc)",
        "All Material type and specs Mentioned",
        "All Material Thickness Mentioned",
        "All Finish Type Mentioned",
        "All Finish Code Mentioned",
        "All Lock location and Details Mentioned",
        "All Handle locations and Details Mentioned",
        "All Hardware details mentioned",
        "Seat Cushion Details Mentioned",
        "Fabric Code Mentioned",
        "Foam Density Mentioned"

    ]},

        beds: 
    {drawingLevel : "ROOM",
        checklist :[

        "Plan Available with location shown in furniture layout",
        "Fornt and side Elevation Available",
        "Front and side Section Available (external and interal elevations)",
        "L x H X D mentioned",
        "Internal Layout shown with dimensions",
        "Type of bed mentioned",
        "All Material type and specifications Mentioned",
        "All Material Thickness Mentioned",
        "All Finish Type Mentioned",
        "All Finish Code Mentioned",
        "All hardware location and Details Mentioned"

    ]},

      headboards: {drawingLevel : "ROOM",
        checklist :[

        "Plan Available with location shown in furniture layout",
        "Fornt Elevation Available",
        "Front and side Section Available (external and interal elevations)",
        "L x H X D mentioned",
        "Any curvature dimentions mentioned",
        "Any design details (like pleating etc) mentioned with dimensions",
        "All Material type and specifications Mentioned",
        "All Material Thickness Mentioned",
        "All Finish Types Mentioned",
        "All Finish Code (fabric, laminate etc) Mentioned",
        "Foam Density Mentioned"

    ]},

    // =====================================
    // ANY STORAGE
    // =====================================

    anyStorages: {drawingLevel : "ROOM",
        checklist :[
        "Plan Available with location shown in furniture layout",
        "Elevation Available",
        "Front and side Section Available (external and interal elevations)",
        "L x H X D mentioned",
        "Shutter details shown along with opening side and details of design elements(as applicable)",
        "Internal Layout shown with dimensions (of shelves, drawers, partiitons etc)",
        "All Material type and specification Mentioned",
        "All Material Thickness Mentioned",
        "All Finish Type Mentioned",
        "All Finish Code Mentioned",
        "All Lock location and Details Mentioned",
        "All Handle locations and Details Mentioned",
         "All Hardware details mentioned"
    ]},

    // =====================================
    // TV UNIT
    // =====================================

    tvUnit: {drawingLevel : "MANUAL",
        checklist :[

        "Elevation Available",
        "Section Available",

        "Height Mentioned",
        "Width Mentioned",
        "Depth Mentioned",

        "TV Size Mentioned",

        "Material Thickness Mentioned",

        "Laminate Code Mentioned",

        "Electrical Connections Shown"

    ]},

    // =====================================
    // MANDIR UNIT
    // =====================================

   mandirUnit: {drawingLevel : "MANUAL",
        checklist :[

    "Furniture plan available and Mandir location clearly identified",

    "All elevations provided (Front, Side and Internal where applicable)",

    "All sections provided (External and Internal wherever required)",

    "Overall dimensions (Length × Width × Height) mentioned",

    "All individual component dimensions mentioned (shelves, drawers, partitions, pedestals, skirting, top, etc.)",
    "All Individual component quantity (drawers, shelves etc) verified with the BOQ description",
    "Shutter details as per BOQ (quantity, size, opening direction and shutter type)",

    "Shutter design details as per BOQ with dimensions (grooves, CNC, glass, jali, fluting, profile, moulding or any decorative element, wherever applicable)",

    "Pocket door details complete (opening mechanism, dimensions, wherever applicable)",

    "Internal layout complete with dimensions for every storage compartment",
    
    "All partition details shown with dimensions (CNC partitions, vertical partitions, horizontal partitions, dividers, etc.)",

    "All material specifications mentioned for every component (Plywood/MDF/HDF/Solid Wood/Glass/Stone/Metal etc.)",

    "Material thickness specified for every component",

    "Finish type specified for every visible surface (Laminate, PU, Veneer, Acrylic, Duco, Paint, Polish, etc.)",

    "Finish code specified for every finished component",

    "Handle details complete (location and quantity)",

    "Lock details complete (location and quantity)",

    "Electrical provisions complete (light points, LED strips, switch placement wherever applicable)"

   

]},

    // =====================================
    // WALL PANELLING
    // =====================================

    wallPanelling: {drawingLevel : "ROOM",
        checklist :[

        "Elevation shown with dimensions",
        "Section shown with dimensions",
        "Top view shown with dimensions",
        "Lenght, width and dept of panelling mentioned",
        "Any designs on Panelling like groove,T patti shown with dimensions",
        "Curved design radius and arc dimensions mentioned",
        "Material Mentioned with specification(thickness, type)",
        "Laminate Code Mentioned",
        "Both Side Elevations Available",
        "Cove Details (if any) shown in the section with details",
        "Covelight shown along with electrical provision",
        "Skirting Interface Mentioned"

    ]},

    // =====================================
    // MIRROR PANELLING
    // =====================================

    mirrorPanelling: {drawingLevel : "ROOM",
        checklist :[

        "Elevation Available",
        "Section Available",
        "Mirror Thickness Mentioned",
        "Mirror Type Mentioned",
        "Bevel Details Mentioned",
        "Frame Details Mentioned",
        "Backing Material Mentioned",
        "Backing Thickness Mentioned",
        "All Dimensions Mentioned"

    ]},

    // =====================================
    // VANITY UNIT
    // =====================================

    vanityUnit: {drawingLevel : "ROOM",
        checklist :[

        "Plan shown with location shown in furniture layout",
        "Elevation shown with external and internal elevation",
        "Front and side Section shown with dimensions",
        "Internal elevation shown with dimensions and components",
        "Vertical/partition panels shown (As applicable)",
        "L x H X D dimensions are shown",
        "Shutter details shown along with opening side and details of design elements(as applicable)",
        "Internal Layout shown with dimensions (of shelves, drawers etc)",
        "Qty of drawers shown is as per BOQ",
        "Qty of shelves shown is as per BOQ",
        "Channels type is shown and is as per BOQ",
        "Material type and specification is mentioned and matches with BOQ",
        "Material Thickness (Ply,laminate etc) is mentioned and matches with BOQ",
        "Internal Finish Type mentioned and matches with BOQ",
        "External Finish Type mentioned and matches with BOQ",
        "Laminate/Veneer Code Mentioned (as applicable)",
        "All Lock location and Details Mentioned",
        "All Handle locations and Details Mentioned",
         "Any other Hardware details mentioned"

    ]},

    // =====================================
    // LEDGES
    // =====================================

    ledges: {drawingLevel : "ROOM",
        checklist :[

        "Elevation Available",
        "Plan Available",
        "Ledge Thickness Mentioned",
        "Material Mentioned",
        "Finish Details Mentioned",
        "Bracket Details Mentioned",
        "Shelf Spacing Mentioned"

    ]},

    // =====================================
    // WOODEN PARTITION
    // =====================================

    woodenPartition: {drawingLevel : "ROOM",
        checklist :[

        "Elevation Available",
            "Top view shown with dimensions",
        "Rafter Size Mentioned",
        "Rafter Material Mentioned",
        "Finish Type Mentioned",
        "Fixing Details Mentioned",
        "Floor Fixing Mentioned",
        "Ceiling Fixing Mentioned",
        "Rafter Spacing Mentioned"

    ]},

    // =====================================
    // WOODEN PELMET
    // =====================================

    woodenPelmet: 
        {drawingLevel : "ROOM",
        checklist :[

        "Plan Available",
        "Front Elevation Available",
        "Side Elevation Available",
        "Material Mentioned",
        "Material Thickness Mentioned",
        "Finish Type Mentioned",
        "Finish Code Mentioned",
        "Pelmet Width Mentioned",
        "Pelmet Depth Mentioned",
        "Pelmet Height Mentioned"

    ]},

    // =====================================
    // PLY BOXING
    // =====================================

    plyBoxing: {drawingLevel : "ROOM",
        checklist :[

        "Plan Available",
        "Front Elevation Available",
        "Side Elevation Available",
        "Material Mentioned",
        "Material Thickness Mentioned",
        "Finish Type Mentioned",
        "Finish Code Mentioned",
        "Boxing Width Mentioned",
        "Boxing Depth Mentioned",
        "Boxing Height Mentioned"

    ]},

    // =====================================
    // TRIMS
    // =====================================

    TrimsorMouldings: {drawingLevel : "ROOM",
        checklist :[

        "Elevation Available with dimensions",
        "Trim/Moulding Profile Mentioned",
        "Trim/Moulding Size Mentioned",
        "Trim/Moulding Material Mentioned",
        "Finish Type Mentioned",
        "Trim/Moulding Spacing Mentioned",
        "Trim/Mouldings dimensions Mentioned",
        "Trims/Mouldings curved design radius and dimensions mentioned",
        "Starting Point xy co ordinates Mentioned",
        "Loose furniture hatching shown and clash checked",
        "Any modules clash checked",
        "Any wall light points shown with dimensions",
        "Wall Offset Mentioned"

    ]},

    // =====================================
    // SAFETY DOOR
    // =====================================

    safetyDoor: 
{drawingLevel : "ROOM",
        checklist :[

        "Plan Available",
        "Elevation Available",
        "Section Available",
        "Door Width Mentioned",
        "Door Height Mentioned",
        "Opening Side Shown",
        "Finishing details Mentioned",
        "Door Thickness Mentioned",
        "Jali Design Mentioned",
        "Jali Dimensions Mentioned",
        "Lock location Mentioned",
        "Handle location Mentioned"

    ]},

    // =====================================
    // WINDOW GRILLS
    // =====================================

    windowGrills: {drawingLevel : "ROOM",
        checklist :[


        "Elevation Available",
        "Grill Layout Available",
        "Width Mentioned",
        "Height Mentioned",

        "Rod Thickness Mentioned",

        "Rod Spacing Mentioned",

        "Grill Type Mentioned",

        "Paint Type Mentioned",

        "Paint Colour Mentioned",

        "Paint Code Mentioned"

    ]},

    // =====================================
    // METAL DESIGN ELEMENTS
    // =====================================

    metalDesignElements: {drawingLevel : "ROOM",
        checklist :[


        "Plan Available",

        "Elevation Available",

        "Section Available",
            "Top view shown",

        "Dimensions Mentioned",

        "Material Mentioned",

        "Material Thickness Mentioned",

        "Fixing Details Mentioned",

        "Finish Type Mentioned",

        "Colour Mentioned",

        "Installation Details Mentioned"

    ]},

    // =====================================
    // MS SHED
    // =====================================

    msShed: {drawingLevel : "ROOM",
        checklist :[


        "Plan Available",

        "Elevation Available",

        "Section Available",

        "Length Mentioned",

        "Width Mentioned",

        "Height Mentioned",

        "MS Section Size Mentioned",

        "Sheet Specification Mentioned",

        "Slope Mentioned",

        "Drainage Direction Mentioned",

        "Paint System Mentioned",

        "Fixing Details Mentioned"

    ]},

    // =====================================
    // PERGOLA
    // =====================================

    pergola: {drawingLevel : "ROOM",
        checklist :[


        "Plan Available",

        "Elevation Available",

        "Section Available",

        "Length Mentioned",

        "Width Mentioned",

        "Height Mentioned",

        "Rafter Size Mentioned",

        "Rafter Spacing Mentioned",

        "Material Mentioned",

        "Finish Mentioned",

        "Fixing Details Mentioned"

    ]}


    

};
