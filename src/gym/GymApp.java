package gym;

import javax.swing.*;
import javax.swing.border.*;
import javax.swing.table.*;
import java.awt.*;
import java.awt.event.*;
import java.sql.SQLException;
import java.util.List;

public class GymApp extends JFrame {

    private static final Color BG_DARK      = new Color(15,  17,  26);
    private static final Color BG_CARD      = new Color(24,  27,  42);
    private static final Color BG_FIELD     = new Color(33,  37,  57);
    private static final Color ACCENT       = new Color(99, 179, 237);
    private static final Color ACCENT_GREEN = new Color(72, 199, 142);
    private static final Color ACCENT_RED   = new Color(252, 100, 100);
    private static final Color ACCENT_ORG   = new Color(250, 176,  60);
    private static final Color TXT_PRIMARY  = new Color(230, 232, 245);
    private static final Color TXT_MUTED    = new Color(130, 140, 170);
    private static final Color TBL_HEADER   = new Color(30,  34,  55);
    private static final Color TBL_ROW_ODD  = new Color(24,  27,  42);
    private static final Color TBL_ROW_EVN  = new Color(28,  32,  50);
    private static final Color TBL_SEL      = new Color(60,  90, 140);

    private static final Font FONT_TITLE  = new Font("Segoe UI", Font.BOLD,  22);
    private static final Font FONT_LABEL  = new Font("Segoe UI", Font.BOLD,  12);
    private static final Font FONT_FIELD  = new Font("Segoe UI", Font.PLAIN, 13);
    private static final Font FONT_BTN    = new Font("Segoe UI", Font.BOLD,  12);
    private static final Font FONT_TABLE  = new Font("Segoe UI", Font.PLAIN, 12);
    private static final Font FONT_HEADER = new Font("Segoe UI", Font.BOLD,  12);
    private static final Font FONT_SUB    = new Font("Segoe UI", Font.PLAIN, 11);

    private final MemberDAO dao = new MemberDAO();

    private JTextField   txtName, txtAge, txtPhone, txtDays, txtSearch;
    private JTextArea    txtAddress;
    private JComboBox<String> cboPlan;

    private JTable            table;
    private DefaultTableModel tableModel;

    private int selectedId = -1;

    public GymApp() {
        setTitle("Warhouse-Gym  ·  Member Management System");
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setSize(1200, 760);
        setMinimumSize(new Dimension(1000, 660));
        setLocationRelativeTo(null);

        getContentPane().setBackground(BG_DARK);
        setLayout(new BorderLayout(12, 12));

        add(buildHeader(),  BorderLayout.NORTH);
        add(buildCenter(),  BorderLayout.CENTER);
        add(buildFooter(),  BorderLayout.SOUTH);

        loadTable(null);
        setVisible(true);
    }

    private JPanel buildHeader() {
        JPanel header = new JPanel(new BorderLayout());
        header.setBackground(BG_CARD);
        header.setBorder(new EmptyBorder(16, 24, 16, 24));

        JPanel left = new JPanel(new FlowLayout(FlowLayout.LEFT, 12, 0));
        left.setOpaque(false);

        JLabel icon = new JLabel("🏋");
        icon.setFont(new Font("Segoe UI Emoji", Font.PLAIN, 30));

        JPanel titles = new JPanel(new GridLayout(2, 1));
        titles.setOpaque(false);
        JLabel title    = makeLabel("WARHOUSE-GYM", FONT_TITLE, ACCENT);
        JLabel subtitle = makeLabel("Member Management System", FONT_SUB, TXT_MUTED);
        titles.add(title);
        titles.add(subtitle);

        left.add(icon);
        left.add(titles);

        JPanel right = new JPanel(new FlowLayout(FlowLayout.RIGHT, 8, 0));
        right.setOpaque(false);

        txtSearch = styledField("Search by name…", 18);
        JButton btnSearch = styledButton("🔍  Search", ACCENT, BG_DARK);
        JButton btnClear  = styledButton("✕  Clear",  TXT_MUTED, BG_DARK);

        btnSearch.addActionListener(e -> loadTable(txtSearch.getText().trim()));
        btnClear .addActionListener(e -> { txtSearch.setText(""); loadTable(null); });

        right.add(makeLabel("Search:", FONT_LABEL, TXT_MUTED));
        right.add(txtSearch);
        right.add(btnSearch);
        right.add(btnClear);

        header.add(left,  BorderLayout.WEST);
        header.add(right, BorderLayout.EAST);
        return header;
    }

    private JSplitPane buildCenter() {
        JSplitPane split = new JSplitPane(JSplitPane.HORIZONTAL_SPLIT,
                                          buildFormPanel(), buildTablePanel());
        split.setDividerLocation(370);
        split.setDividerSize(6);
        split.setBorder(BorderFactory.createEmptyBorder(0, 12, 0, 12));
        split.setBackground(BG_DARK);
        split.setOpaque(false);
        return split;
    }

    private JPanel buildFormPanel() {
        JPanel card = new JPanel(new BorderLayout());
        card.setBackground(BG_CARD);
        card.setBorder(BorderFactory.createCompoundBorder(
            new LineBorder(BG_FIELD, 1, true),
            new EmptyBorder(18, 20, 18, 20)
        ));

        JLabel formTitle = makeLabel("MEMBER DETAILS", new Font("Segoe UI", Font.BOLD, 13), ACCENT);
        JPanel topBar = new JPanel(new BorderLayout());
        topBar.setOpaque(false);
        topBar.add(formTitle, BorderLayout.WEST);
        topBar.setBorder(new EmptyBorder(0, 0, 14, 0));

        JPanel fields = new JPanel(new GridBagLayout());
        fields.setOpaque(false);
        GridBagConstraints gc = new GridBagConstraints();
        gc.fill   = GridBagConstraints.HORIZONTAL;
        gc.insets = new Insets(5, 0, 5, 0);
        gc.weightx = 1;

        txtName    = styledField("Full name",           20);
        txtAge     = styledField("Age (years)",         20);
        cboPlan    = styledCombo(new String[]{
            "Monthly – ₹999", "Quarterly – ₹2499",
            "Half-Yearly – ₹4499", "Annual – ₹7999",
            "Day Pass – ₹99"
        });
        txtPhone   = styledField("10-digit mobile no.", 20);
        txtDays    = styledField("Days present",        20);
        txtAddress = new JTextArea(4, 20);
        txtAddress.setFont(FONT_FIELD);
        txtAddress.setBackground(BG_FIELD);
        txtAddress.setForeground(TXT_PRIMARY);
        txtAddress.setCaretColor(ACCENT);
        txtAddress.setBorder(new EmptyBorder(8, 10, 8, 10));
        txtAddress.setLineWrap(true);
        txtAddress.setWrapStyleWord(true);

        int row = 0;
        addFormRow(fields, gc, row++, "👤  Full Name",       txtName);
        addFormRow(fields, gc, row++, "🎂  Age",             txtAge);
        addFormRow(fields, gc, row++, "💳  Membership Plan", cboPlan);
        addFormRow(fields, gc, row++, "📞  Phone No.",       txtPhone);
        addFormRow(fields, gc, row++, "🏠  Address",
                   new JScrollPane(txtAddress) {{
                       setBorder(BorderFactory.createLineBorder(BG_FIELD));
                       getViewport().setBackground(BG_FIELD);
                   }});
        addFormRow(fields, gc, row, "📅  Days Present",    txtDays);

        JPanel btnPanel = new JPanel(new GridLayout(2, 2, 8, 8));
        btnPanel.setOpaque(false);
        btnPanel.setBorder(new EmptyBorder(16, 0, 0, 0));

        JButton btnAdd    = styledButton("➕  Add Member", ACCENT_GREEN, BG_DARK);
        JButton btnUpdate = styledButton("✏️  Update",     ACCENT,       BG_DARK);
        JButton btnDelete = styledButton("🗑️  Delete",     ACCENT_RED,   BG_DARK);
        JButton btnClear  = styledButton("🔄  Clear Form", ACCENT_ORG,   BG_DARK);

        btnAdd   .addActionListener(e -> addMember());
        btnUpdate.addActionListener(e -> updateMember());
        btnDelete.addActionListener(e -> deleteMember());
        btnClear .addActionListener(e -> clearForm());

        btnPanel.add(btnAdd);
        btnPanel.add(btnUpdate);
        btnPanel.add(btnDelete);
        btnPanel.add(btnClear);

        card.add(topBar,   BorderLayout.NORTH);
        card.add(fields,   BorderLayout.CENTER);
        card.add(btnPanel, BorderLayout.SOUTH);
        return card;
    }

    private JPanel buildTablePanel() {
        JPanel card = new JPanel(new BorderLayout());
        card.setBackground(BG_CARD);
        card.setBorder(BorderFactory.createCompoundBorder(
            new LineBorder(BG_FIELD, 1, true),
            new EmptyBorder(18, 20, 18, 20)
        ));

        JLabel tblTitle = makeLabel("REGISTERED MEMBERS", new Font("Segoe UI", Font.BOLD, 13), ACCENT);
        JPanel topBar   = new JPanel(new BorderLayout());
        topBar.setOpaque(false);
        topBar.add(tblTitle, BorderLayout.WEST);
        topBar.setBorder(new EmptyBorder(0, 0, 14, 0));

        String[] cols = { "#", "Name", "Age", "Plan", "Phone No.", "Address", "Days Present" };
        tableModel = new DefaultTableModel(cols, 0) {
            @Override public boolean isCellEditable(int r, int c) { return false; }
        };

        table = new JTable(tableModel);
        table.setFont(FONT_TABLE);
        table.setForeground(TXT_PRIMARY);
        table.setBackground(TBL_ROW_ODD);
        table.setSelectionBackground(TBL_SEL);
        table.setSelectionForeground(Color.WHITE);
        table.setRowHeight(28);
        table.setShowGrid(false);
        table.setIntercellSpacing(new Dimension(0, 1));
        table.setFillsViewportHeight(true);
        table.setAutoResizeMode(JTable.AUTO_RESIZE_ALL_COLUMNS);

        table.setDefaultRenderer(Object.class, new DefaultTableCellRenderer() {
            @Override
            public Component getTableCellRendererComponent(JTable t, Object val,
                    boolean isSel, boolean hasFocus, int row, int col) {
                super.getTableCellRendererComponent(t, val, isSel, hasFocus, row, col);
                setFont(FONT_TABLE);
                setBorder(new EmptyBorder(0, 8, 0, 8));
                if (isSel) {
                    setBackground(TBL_SEL);
                    setForeground(Color.WHITE);
                } else {
                    setBackground(row % 2 == 0 ? TBL_ROW_ODD : TBL_ROW_EVN);
                    setForeground(TXT_PRIMARY);
                }
                return this;
            }
        });

        JTableHeader header = table.getTableHeader();
        header.setFont(FONT_HEADER);
        header.setBackground(TBL_HEADER);
        header.setForeground(ACCENT);
        header.setBorder(BorderFactory.createEmptyBorder());
        header.setReorderingAllowed(false);

        int[] widths = {40, 150, 50, 170, 110, 200, 90};
        for (int i = 0; i < widths.length; i++)
            table.getColumnModel().getColumn(i).setPreferredWidth(widths[i]);

        table.getSelectionModel().addListSelectionListener(e -> {
            if (!e.getValueIsAdjusting()) populateFormFromTable();
        });

        JScrollPane scroll = new JScrollPane(table);
        scroll.setBorder(BorderFactory.createEmptyBorder());
        scroll.getViewport().setBackground(TBL_ROW_ODD);
        scroll.getVerticalScrollBar()  .setBackground(BG_FIELD);
        scroll.getHorizontalScrollBar().setBackground(BG_FIELD);

        card.add(topBar, BorderLayout.NORTH);
        card.add(scroll, BorderLayout.CENTER);
        return card;
    }

    private JPanel buildFooter() {
        JPanel footer = new JPanel(new BorderLayout());
        footer.setBackground(BG_CARD);
        footer.setBorder(new EmptyBorder(8, 24, 8, 24));
        JLabel info = makeLabel(
            "Warhouse-Gym  |  Connected to MySQL via XAMPP  |  © 2024",
            FONT_SUB, TXT_MUTED);
        footer.add(info, BorderLayout.WEST);
        return footer;
    }

    private void addMember() {
        Member m = collectForm();
        if (m == null) return;
        try {
            boolean ok = dao.addMember(m);
            if (ok) {
                showInfo("Member added successfully! ✅");
                clearForm();
                loadTable(null);
            }
        } catch (SQLException ex) {
            showError("DB Error: " + ex.getMessage());
        }
    }

    private void updateMember() {
        if (selectedId == -1) { showWarn("Select a member from the table first."); return; }
        Member m = collectForm();
        if (m == null) return;
        m.setId(selectedId);
        try {
            if (dao.updateMember(m)) {
                showInfo("Member updated successfully! ✏️");
                clearForm();
                loadTable(null);
            }
        } catch (SQLException ex) {
            showError("DB Error: " + ex.getMessage());
        }
    }

    private void deleteMember() {
        if (selectedId == -1) { showWarn("Select a member from the table first."); return; }
        int confirm = JOptionPane.showConfirmDialog(this,
            "Are you sure you want to delete this member?",
            "Confirm Delete", JOptionPane.YES_NO_OPTION, JOptionPane.WARNING_MESSAGE);
        if (confirm != JOptionPane.YES_OPTION) return;
        try {
            if (dao.deleteMember(selectedId)) {
                showInfo("Member deleted successfully! 🗑️");
                clearForm();
                loadTable(null);
            }
        } catch (SQLException ex) {
            showError("DB Error: " + ex.getMessage());
        }
    }

    private void loadTable(String keyword) {
        try {
            List<Member> members = (keyword == null || keyword.isEmpty())
                ? dao.getAllMembers()
                : dao.searchByName(keyword);

            tableModel.setRowCount(0);
            for (Member m : members) {
                tableModel.addRow(new Object[]{
                    m.getId(),
                    m.getName(),
                    m.getAge(),
                    m.getPlan(),
                    m.getPhoneno(),
                    m.getAddress(),
                    m.getDaysPresent()
                });
            }
        } catch (SQLException ex) {
            showError("Failed to load members: " + ex.getMessage());
        }
    }

    private void populateFormFromTable() {
        int row = table.getSelectedRow();
        if (row < 0) return;
        selectedId = (int) tableModel.getValueAt(row, 0);
        txtName .setText((String)  tableModel.getValueAt(row, 1));
        txtAge  .setText(String.valueOf(tableModel.getValueAt(row, 2)));
        String plan = (String) tableModel.getValueAt(row, 3);
        for (int i = 0; i < cboPlan.getItemCount(); i++) {
            if (cboPlan.getItemAt(i).equals(plan)) { cboPlan.setSelectedIndex(i); break; }
        }
        txtPhone  .setText((String) tableModel.getValueAt(row, 4));
        txtAddress.setText((String) tableModel.getValueAt(row, 5));
        txtDays   .setText(String.valueOf(tableModel.getValueAt(row, 6)));
    }

    private Member collectForm() {
        String name    = txtName.getText().trim();
        String ageStr  = txtAge.getText().trim();
        String plan    = (String) cboPlan.getSelectedItem();
        String phone   = txtPhone.getText().trim();
        String address = txtAddress.getText().trim();
        String daysStr = txtDays.getText().trim();

        if (name.isEmpty() || ageStr.isEmpty() || phone.isEmpty()
                || address.isEmpty() || daysStr.isEmpty()) {
            showWarn("All fields are required.");
            return null;
        }
        int age, days;
        try { age  = Integer.parseInt(ageStr);  } catch (NumberFormatException e) { showWarn("Age must be a number.");          return null; }
        try { days = Integer.parseInt(daysStr); } catch (NumberFormatException e) { showWarn("Days Present must be a number."); return null; }
        if (age  <= 0 || age  > 120) { showWarn("Enter a valid age (1–120).");       return null; }
        if (days < 0)                { showWarn("Days Present cannot be negative."); return null; }
        if (!phone.matches("\\d{10}")) { showWarn("Phone number must be exactly 10 digits."); return null; }

        return new Member(name, age, plan, phone, address, days);
    }

    private void clearForm() {
        selectedId = -1;
        txtName.setText("");
        txtAge.setText("");
        cboPlan.setSelectedIndex(0);
        txtPhone.setText("");
        txtAddress.setText("");
        txtDays.setText("");
        table.clearSelection();
    }

    private JLabel makeLabel(String text, Font font, Color color) {
        JLabel l = new JLabel(text);
        l.setFont(font);
        l.setForeground(color);
        return l;
    }

    private JTextField styledField(String placeholder, int cols) {
        JTextField f = new JTextField(cols) {
            @Override protected void paintComponent(Graphics g) {
                super.paintComponent(g);
                if (getText().isEmpty() && !isFocusOwner()) {
                    Graphics2D g2 = (Graphics2D) g;
                    g2.setColor(TXT_MUTED);
                    g2.setFont(getFont().deriveFont(Font.ITALIC));
                    g2.drawString(placeholder, 10, getHeight() / 2 + getFont().getSize() / 2 - 1);
                }
            }
        };
        f.setFont(FONT_FIELD);
        f.setBackground(BG_FIELD);
        f.setForeground(TXT_PRIMARY);
        f.setCaretColor(ACCENT);
        f.setBorder(BorderFactory.createCompoundBorder(
            new LineBorder(new Color(60, 70, 100), 1, true),
            new EmptyBorder(7, 10, 7, 10)
        ));
        return f;
    }

    private JComboBox<String> styledCombo(String[] items) {
        JComboBox<String> cb = new JComboBox<>(items);
        cb.setFont(FONT_FIELD);
        cb.setBackground(BG_FIELD);
        cb.setForeground(TXT_PRIMARY);
        cb.setBorder(BorderFactory.createLineBorder(new Color(60, 70, 100), 1));
        cb.setRenderer(new DefaultListCellRenderer() {
            @Override
            public Component getListCellRendererComponent(JList<?> list, Object value,
                    int index, boolean isSel, boolean hasFocus) {
                super.getListCellRendererComponent(list, value, index, isSel, hasFocus);
                setBackground(isSel ? TBL_SEL : BG_FIELD);
                setForeground(TXT_PRIMARY);
                setBorder(new EmptyBorder(5, 10, 5, 10));
                return this;
            }
        });
        return cb;
    }

    private JButton styledButton(String text, Color fg, Color bg) {
        JButton btn = new JButton(text) {
            @Override protected void paintComponent(Graphics g) {
                Graphics2D g2 = (Graphics2D) g.create();
                g2.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
                Color base = fg.darker().darker();
                if (getModel().isPressed()) {
                    g2.setColor(base.darker());
                } else if (getModel().isRollover()) {
                    g2.setColor(new Color(fg.getRed(), fg.getGreen(), fg.getBlue(), 60));
                } else {
                    g2.setColor(new Color(fg.getRed(), fg.getGreen(), fg.getBlue(), 30));
                }
                g2.fillRoundRect(0, 0, getWidth(), getHeight(), 10, 10);
                g2.dispose();
                super.paintComponent(g);
            }
        };
        btn.setFont(FONT_BTN);
        btn.setForeground(fg);
        btn.setBackground(new Color(0, 0, 0, 0));
        btn.setOpaque(false);
        btn.setContentAreaFilled(false);
        btn.setBorderPainted(true);
        btn.setBorder(BorderFactory.createCompoundBorder(
            new LineBorder(fg, 1, true),
            new EmptyBorder(8, 14, 8, 14)
        ));
        btn.setCursor(Cursor.getPredefinedCursor(Cursor.HAND_CURSOR));
        btn.setFocusPainted(false);
        return btn;
    }

    private void addFormRow(JPanel panel, GridBagConstraints gc, int row, String label, JComponent field) {
        gc.gridx = 0; gc.gridy = row * 2;     gc.gridwidth = 1;
        panel.add(makeLabel(label, FONT_LABEL, TXT_MUTED), gc);
        gc.gridx = 0; gc.gridy = row * 2 + 1; gc.gridwidth = 1;
        panel.add(field, gc);
    }

    private void showInfo(String msg)  { JOptionPane.showMessageDialog(this, msg, "Success", JOptionPane.INFORMATION_MESSAGE); }
    private void showWarn(String msg)  { JOptionPane.showMessageDialog(this, msg, "Warning", JOptionPane.WARNING_MESSAGE); }
    private void showError(String msg) { JOptionPane.showMessageDialog(this, msg, "Error",   JOptionPane.ERROR_MESSAGE); }

    public static void main(String[] args) {
        try { UIManager.setLookAndFeel(UIManager.getCrossPlatformLookAndFeelClassName()); }
        catch (Exception ignored) {}

        UIManager.put("Panel.background",             BG_DARK);
        UIManager.put("OptionPane.background",        BG_CARD);
        UIManager.put("OptionPane.messageForeground", TXT_PRIMARY);
        UIManager.put("Button.background",            BG_FIELD);
        UIManager.put("Button.foreground",            TXT_PRIMARY);
        UIManager.put("Label.foreground",             TXT_PRIMARY);
        UIManager.put("ScrollBar.thumb",              new Color(60, 70, 100));
        UIManager.put("ScrollBar.track",              BG_FIELD);
        UIManager.put("ComboBox.selectionBackground", TBL_SEL);
        UIManager.put("ComboBox.selectionForeground", Color.WHITE);
        UIManager.put("PopupMenu.background",         BG_FIELD);
        UIManager.put("MenuItem.background",          BG_FIELD);
        UIManager.put("MenuItem.foreground",          TXT_PRIMARY);

        SwingUtilities.invokeLater(GymApp::new);
    }
}
