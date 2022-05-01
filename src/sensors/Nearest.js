import Queue from "./Queue.js";
import Vector2d from "./Vector2d.js";

class Nearest extends Vector2d {
    constructor(dorg, entity, area) {
        super(dorg);
        this.entity = entity;
        this.area = area;
    }

    sense() {
        const target = this.nearestCell;
        const r = this.area.radius;
        let output = this.gravity(target, r)
        this.normalize_(output, r);
        if (!target) return output
        this.orient_(output, target);
        return output
    }

    get nearestCell() {
        const root = this.source;
        let queue = new Queue(),
            visited = new Set(),
            v,
            cell;

        queue.enqueue(root);
        visited.add(root);

        while (!queue.isEmpty) {

            v = queue.dequeue();

            for (cell of this.grid.getAdjacent(v)) {
                // continue if cell is out of bounds
                if (!this.area.includes(cell))
                    continue;
                // return this cell if it is what we are looking for!
                if (cell.owner instanceof this.entity)
                    return cell;
                
                if (!visited.has(cell)) {
                    queue.enqueue(cell);
                    visited.add(cell);
                }
            }
        }
        return null;
    }
}

export default Nearest;