package gym;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class MemberDAO {

    public boolean addMember(Member m) throws SQLException {
        String sql = "INSERT INTO Members (name, age, plan, phoneno, address, days_present) "
                   + "VALUES (?, ?, ?, ?, ?, ?)";
        try (Connection con = DBConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setString(1, m.getName());
            ps.setInt   (2, m.getAge());
            ps.setString(3, m.getPlan());
            ps.setString(4, m.getPhoneno());
            ps.setString(5, m.getAddress());
            ps.setInt   (6, m.getDaysPresent());

            return ps.executeUpdate() > 0;
        }
    }

    public List<Member> getAllMembers() throws SQLException {
        List<Member> list = new ArrayList<>();
        String sql = "SELECT id, name, age, plan, phoneno, address, days_present FROM Members ORDER BY id";

        try (Connection con = DBConnection.getConnection();
             Statement st   = con.createStatement();
             ResultSet rs   = st.executeQuery(sql)) {

            while (rs.next()) {
                list.add(new Member(
                    rs.getInt   ("id"),
                    rs.getString("name"),
                    rs.getInt   ("age"),
                    rs.getString("plan"),
                    rs.getString("phoneno"),
                    rs.getString("address"),
                    rs.getInt   ("days_present")
                ));
            }
        }
        return list;
    }

    public boolean updateMember(Member m) throws SQLException {
        String sql = "UPDATE Members SET name=?, age=?, plan=?, phoneno=?, address=?, days_present=? "
                   + "WHERE id=?";
        try (Connection con = DBConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setString(1, m.getName());
            ps.setInt   (2, m.getAge());
            ps.setString(3, m.getPlan());
            ps.setString(4, m.getPhoneno());
            ps.setString(5, m.getAddress());
            ps.setInt   (6, m.getDaysPresent());
            ps.setInt   (7, m.getId());

            return ps.executeUpdate() > 0;
        }
    }

    public boolean deleteMember(int id) throws SQLException {
        String sql = "DELETE FROM Members WHERE id=?";
        try (Connection con = DBConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setInt(1, id);
            return ps.executeUpdate() > 0;
        }
    }

    public List<Member> searchByName(String keyword) throws SQLException {
        List<Member> list = new ArrayList<>();
        String sql = "SELECT id, name, age, plan, phoneno, address, days_present "
                   + "FROM Members WHERE name LIKE ? ORDER BY id";

        try (Connection con = DBConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setString(1, "%" + keyword + "%");
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    list.add(new Member(
                        rs.getInt   ("id"),
                        rs.getString("name"),
                        rs.getInt   ("age"),
                        rs.getString("plan"),
                        rs.getString("phoneno"),
                        rs.getString("address"),
                        rs.getInt   ("days_present")
                    ));
                }
            }
        }
        return list;
    }
}
