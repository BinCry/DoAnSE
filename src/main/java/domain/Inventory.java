package domain;

public class Inventory {
    private final long flightInstanceId;
    private final int total;
    private final int sold;
    private final int held;

    public Inventory(long flightInstanceId, int total, int sold, int held) {
        this.flightInstanceId = flightInstanceId;
        this.total = total;
        this.sold = sold;
        this.held = held;
    }

    public long getFlightInstanceId() {
        return flightInstanceId;
    }

    public int getTotal() {
        return total;
    }

    public int getSold() {
        return sold;
    }

    public int getHeld() {
        return held;
    }

    public int getAvailable() {
        return total - sold - held;
    }
}
