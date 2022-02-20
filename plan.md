Class Structure
- Engine
- Environment
- Renderer
- Grid
- Cell
- Org
- Food
  - Veggie
  - Meat
- Organ
  - Input
    - Sight - information about nearby cells
      - Color perception - see what something looks like
        - worse - less color bandwidth
        - more color bandwidth
      - Object identification - see where something is
        - worse - chance of not getting a reading
      - Attention - proximity vs last observation
  - Output
    - Strike - Schnork can kill another in an adjacent cell
  - Stomach
 
Sight  => (Chance of success) * (Cells Searched) * (Color Perceived)
Strike => (Damage Done)
Eat    => -(Bite Size)
Move   => (Tiredness)
if move: tiredness => tiredness + mass
if rest: tiredness => (CONST < 1) * tiredness 

Sprints = good if heavy
Long distances = good if light
