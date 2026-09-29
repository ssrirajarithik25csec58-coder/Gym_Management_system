package gym;

public class Member {

    private int    id;
    private String name;
    private int    age;
    private String plan;
    private String phoneno;
    private String address;
    private int    daysPresent;

    public Member(int id, String name, int age, String plan,
                  String phoneno, String address, int daysPresent) {
        this.id          = id;
        this.name        = name;
        this.age         = age;
        this.plan        = plan;
        this.phoneno     = phoneno;
        this.address     = address;
        this.daysPresent = daysPresent;
    }

    public Member(String name, int age, String plan,
                  String phoneno, String address, int daysPresent) {
        this(0, name, age, plan, phoneno, address, daysPresent);
    }

    public int    getId()           { return id; }
    public void   setId(int id)     { this.id = id; }

    public String getName()                 { return name; }
    public void   setName(String name)      { this.name = name; }

    public int    getAge()                  { return age; }
    public void   setAge(int age)           { this.age = age; }

    public String getPlan()                 { return plan; }
    public void   setPlan(String plan)      { this.plan = plan; }

    public String getPhoneno()              { return phoneno; }
    public void   setPhoneno(String p)      { this.phoneno = p; }

    public String getAddress()              { return address; }
    public void   setAddress(String a)      { this.address = a; }

    public int    getDaysPresent()          { return daysPresent; }
    public void   setDaysPresent(int d)     { this.daysPresent = d; }

    @Override
    public String toString() {
        return "Member{id=" + id + ", name='" + name + "', age=" + age
             + ", plan='" + plan + "', phone='" + phoneno + "', days=" + daysPresent + "}";
    }
}
