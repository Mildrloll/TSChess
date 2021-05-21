function MOVE(from:number, to:number, captured:number, promoted:number, flag:number) {
    return (from | (to << 7) | (captured << 14) | (promoted << 20) | flag);
}