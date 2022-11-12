import javax.swing.*;
import java.awt.*;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.sql.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Scanner;
import java.util.Map.Entry;

public class runner {
	static final String database = "fastsnacks"; /* Name of the database */
    static final String url = "jdbc:mysql://127.0.0.1:3306/" + database; /* uses a local server on port 3306 - MUST HAVE MYSQL Connector/J added as a JAR for referenced libraries  */
    static final String userName = "root";/* Use whatever user account you prefer */
    static final String passWord = "one2three4five!";     /* Include the password for the account of the previous line. */
    
    public static void main(String[] args) throws Exception 
    {
        //createFrame();
        Connection c = connectToDB();
        simpleQuery(c);
        
        ArrayList<String[]> out = searchTable(c, "customer", "username", "ser");
        for(String[] s : out) {
            
            System.out.println(Arrays.toString(s));
            //            for(String a : s) {
            //                System.out.println(a);
            //            }
        }
        
        c.close();
    }
    
    public static ArrayList<String[]> formList(ResultSet rs){
        ArrayList<String[]> out = new ArrayList<>();
        ArrayList<Row> table = new ArrayList<Row>();

       
        try { 
            Row.formTable(rs, table);
    
            for (Row row : table)
            {
                String rowAsString = "";
                for (Entry<Object, Class> col: row.row)
                {
                    rowAsString += (((col.getValue()).cast(col.getKey())) + "\t");
                }
//                System.out.println();
                rowAsString.substring(0, rowAsString.length()-1);
                out.add(rowAsString.split("\t"));
            }
            rs.close();
        }  catch(SQLException ex) {
            System.out.println("ERROR: ");
            System.out.println(ex.getMessage());
        }
        return out;
    }
    /*
     * takes connection and table to search through and the column to look in and term we are searching for and returns all matches
     */
    public static ArrayList<String[]> searchTable(Connection conn, String table, String column,String term){
        ArrayList<String[]> out = new ArrayList<>();
        try {
            /* Create a SQL statement object. */
            Statement stmt = conn.createStatement();
            
            /* Execute a SQL command using SQL command as a String object. */
            stmt.execute("USE " + database + ";"); /* Set the current database, if not already set in the getConnection */
            
            ResultSet rs = stmt.executeQuery("SELECT * FROM " + table + " WHERE " + column + " LIKE \'%" + term+ "%\';");
            out = formList(rs);
            rs.close();
        }
        catch(SQLException ex)
        {
            System.out.println("ERROR: ");
            System.out.println(ex.getMessage());
        }
        
        return out;
    }
    static Connection connectToDB()
    {
        Connection conn = null;
        /* Variables for the database connection */
        System.out.println("Starting...\n");

        try {
            /*
                *  If databaseName is an empty string, you can still connect,
                *  but you will have to execute "USE [databaseName];" before
                *  working with a specific database.
                */

            /* Create a connection to the local MySQL server, with the "company" database selected. */
            conn = DriverManager.getConnection(url,userName,passWord);
        
            
        }
        catch(SQLException ex) {
            System.out.println("ERROR: Cannot connect to database: " + database);
            System.out.println(ex.getMessage());
        }
        return conn;
    }
    public static void simpleQuery(Connection conn)
    {
        
        int rowCount = 0;
        try {
            /* Create a SQL statement object. */
            Statement stmt = conn.createStatement();

            /* Execute a SQL command using SQL command as a String object. */
            stmt.execute("USE " + database + ";"); /* Set the current database, if not already set in the getConnection */

            /* Execute a SQL query using SQL query as a String object. */
            ResultSet rs = stmt.executeQuery("SELECT * FROM customer LIMIT 10;");
            /*
                *  Note: Only the columns listed in the query will be available in the ResultSet object
                *  Note: If 'AS' is used to alias column name, these will be the names in the ResultSet object
                */

            /* Iterate through the result set using ResultSet class's next() method */
            while (rs.next()) {
                /* Keep track of the line/row count. */
                rowCount++;
                System.out.print("row " + rowCount + "|\t");
                System.out.print(rs.getString("username")+ "\t");
                
                System.out.println();
            } // END while(rs.next())

                /* Always close the result set and connection. */
                rs.close();
                System.out.println("\n"  + rowCount + " rows in result set.");
        }
        catch(SQLException ex)
        {
            System.out.println("ERROR: ");
            System.out.println(ex.getMessage());
        }
    }
}

