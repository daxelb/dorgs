class Rect extends Area {
    constructor(dorg, xRadius, yRadius) {
        const radius = Math.max(xRadius, yRadius)
        super(dorg, radius);
        this.xRadius = xRadius;
        this.yRadius = yRadius;
    }

    includes(cell) {
        if (!cell) return false;
        const horizontalDist = Math.abs(cell.col - root.col),
                verticalDist = math.abs(cell.row - root.row);
        return horizontalDist <= xRadius && verticalDist <= yRadius;
    }
}

export default Rect;