<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Flight Booking System | Atharva Hemade</title>
    <style>
        :root {
            --primary: #004a99;
            --success: #28a745;
            --warning: #ffc107;
            --danger: #dc3545;
            --bg: #f4f7f6;
            --text: #333;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            background-color: var(--bg);
            color: var(--text);
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        /* --- Watermark for Identification --- */
        .watermark {
            position: fixed;
            top: 15px;
            left: 15px;
            background: rgba(0, 74, 153, 0.1);
            color: var(--primary);
            padding: 8px 15px;
            border-radius: 20px;
            font-weight: bold;
            font-size: 0.9em;
            letter-spacing: 0.5px;
            pointer-events: none;
            z-index: 1000;
        }

        /* --- Main Header Styling --- */
        header {
            background-color: #fff;
            width: 100%;
            padding: 30px 0;
            text-align: center;
            box-shadow: 0 4px 15px rgba(0,0,0,0.05);
            margin-bottom: 40px;
        }

        header h1 {
            color: var(--primary);
            margin: 0;
            font-weight: 300;
            font-size: 2.5em;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 15px;
        }

        /* --- SVG Airplane Icon --- */
        header svg {
            fill: var(--primary);
            height: 50px;
            width: 50px;
        }

        /* --- Main Content Area --- */
        .main-container {
            width: 90%;
            max-width: 1100px;
            display: grid;
            grid-template-columns: 1fr 2fr;
            gap: 30px;
            margin-bottom: 50px;
        }

        @media (max-width: 800px) {
            .main-container { grid-template-columns: 1fr; }
        }

        /* --- Form Styling --- */
        form {
            background: #fff;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.05);
            align-self: start;
        }

        form input {
            width: 100%;
            padding: 12px 15px;
            margin-bottom: 15px;
            border: 1px solid #ddd;
            border-radius: 6px;
            box-sizing: border-box;
            font-size: 1em;
            transition: border 0.2s;
        }

        form input:focus {
            border-color: var(--primary);
            outline: none;
        }

        form label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
            color: #666;
            font-size: 0.9em;
        }

        /* --- Button Styling --- */
        .btn-group {
            display: grid;
            grid-template-columns: 1fr;
            gap: 10px;
            margin-top: 15px;
        }

        button {
            width: 100%;
            padding: 12px;
            border: none;
            border-radius: 6px;
            color: white;
            font-size: 1em;
            font-weight: bold;
            cursor: pointer;
            transition: background 0.2s, transform 0.1s;
        }

        button:active { transform: translateY(1px); }

        .btn-insert { background-color: var(--success); }
        .btn-insert:hover { background-color: #218838; }

        .btn-update { background-color: var(--warning); color: #212529; }
        .btn-update:hover { background-color: #e0a800; }

        .btn-delete { background-color: var(--danger); }
        .btn-delete:hover { background-color: #c82333; }

        /* --- Table Styling --- */
        table {
            width: 100%;
            border-collapse: collapse;
            background: #fff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0,0,0,0.05);
        }

        table th {
            background-color: var(--primary);
            color: #fff;
            text-align: left;
            padding: 15px;
            font-weight: 500;
        }

        table td {
            padding: 15px;
            border-bottom: 1px solid #eee;
        }

        table tr:last-child td { border-bottom: none; }
        table tr:hover td { background-color: #f8f9fa; }
    </style>
    <script>
        function validateForm(action) {
            let phone = document.forms["bookingForm"]["phone"].value;
            let email = document.forms["bookingForm"]["email"].value;

            // Simple requirement for all actions: a Phone number must be provided
            if (phone.trim() === "") {
                alert("Please provide a phone number for the operation.");
                return false;
            }

            // More stringent checks only for the full booking action
            if (action === 'insert') {
                let name = document.forms["bookingForm"]["name"].value;
                if(name.length < 2) { alert("Please enter a valid passenger name."); return false; }
                if (phone.length < 10) { alert("Phone number must be at least 10 digits."); return false; }
                if (!email.includes("@")) { alert("Please enter a valid email address."); return false; }
            }
            return true;
        }
    </script>
</head>
<body>

<div class="watermark">Student ID: Atharva Hemade</div>

<header>
    <h1>
        <svg viewBox="0 0 512 512">
            <path d="M464 64C490.5 64 512 85.49 512 112V224C512 237.3 501.3 248 488 248H324L166.4 56.41C160.1 50.1 151.7 46.59 142.9 46.59H48C21.49 46.59 0 68.08 0 94.59v6.822c0 10.66 8.641 19.3 19.3 19.3H128c11.33 0 21.6 6.133 26.89 16.13l56.32 107.1H48C21.49 243.9 0 265.4 0 292v6.822c0 10.66 8.641 19.3 19.3 19.3H170.1l56.32 107.1C231.7 435.3 242 441.4 253.3 441.4H464C490.5 441.4 512 419.9 512 393.4v-66.82c0-26.51-21.49-48-48-48h-112L166.4 89.41C160.1 83.1 151.7 79.59 142.9 79.59H48c-11.33 0-21.6 6.133-26.89 16.13l-56.32 107.1C-32.61 228.6 -22.34 234.7 -11.03 234.7H170.1l56.32 107.1c5.292 10 15.56 16.13 26.89 16.13H464C490.5 464 512 442.5 512 416V304C512 290.7 501.3 280 488 280H324l-157.6-191.6C160.1 82.1 151.7 78.59 142.9 78.59H48C21.49 78.59 0 100.1 0 126.6v6.822c0 10.66 8.641 19.3 19.3 19.3H128c11.33 0 21.6 6.133 26.89 16.13l56.32 107.1H48c-26.51 0-48 21.49-48 48V332.6c0 10.66 8.641 19.3 19.3 19.3H170.1l56.32 107.1c5.292 10 15.56 16.13 26.89 16.13H464c26.51 0 48-21.49 48-48V112C512 85.49 490.5 64 464 64zM253.3 288l133.4 224H128L253.3 288z"/>
        </svg>
        Flight Booking Management
    </h1>
</header>

<div class="main-container">
    <form name="bookingForm" method="POST">
        <input type="text" name="name" placeholder="Passenger Name">
        <input type="text" name="from" placeholder="From (Origin)">
        <input type="text" name="to" placeholder="To (Destination)">
        
        <label for="dep_date">Departure Date</label>
        <input type="date" id="dep_date" name="dep_date">
        
        <label for="arr_date">Arrival Date</label>
        <input type="date" id="arr_date" name="arr_date">
        
        <input type="text" name="phone" placeholder="Phone Number (Required)" required>
        <input type="email" name="email" placeholder="Email ID">
        
        <div class="btn-group">
            <button type="submit" name="insert" class="btn-insert" onclick="return validateForm('insert')">Book Flight</button>
            <button type="submit" name="update" class="btn-update" onclick="return validateForm('update')">Update by Phone</button>
            <button type="submit" name="delete" class="btn-delete" onclick="return validateForm('delete')">Delete by Phone</button>
        </div>
    </form>

    <?php
    include 'db.php';

    // (Previous PHP logic for INSERT, UPDATE, DELETE remains the same and must be included here)
    if (isset($_POST['insert'])) {
        $sql = "INSERT INTO passengers (passenger_name, from_location, to_location, departure_date, arrival_date, phone_number, email_id) 
                VALUES ('{$_POST['name']}', '{$_POST['from']}', '{$_POST['to']}', '{$_POST['dep_date']}', '{$_POST['arr_date']}', '{$_POST['phone']}', '{$_POST['email']}')";
        mysqli_query($conn, $sql);
    }

    if (isset($_POST['update'])) {
        $sql = "UPDATE passengers SET from_location='{$_POST['from']}', to_location='{$_POST['to']}' WHERE phone_number='{$_POST['phone']}'";
        mysqli_query($conn, $sql);
    }

    if (isset($_POST['delete'])) {
        $sql = "DELETE FROM passengers WHERE phone_number='{$_POST['phone']}'";
        mysqli_query($conn, $sql);
    }

    $result = mysqli_query($conn, "SELECT * FROM passengers");
    if (mysqli_num_rows($result) > 0) {
        echo "<table><tr><th>Name</th><th>From</th><th>To</th><th>Dep. Date</th><th>Phone</th><th>Email</th></tr>";
        while($row = mysqli_fetch_assoc($result)) {
            echo "<tr>
                    <td>{$row['passenger_name']}</td>
                    <td>{$row['from_location']}</td>
                    <td>{$row['to_location']}</td>
                    <td>{$row['departure_date']}</td>
                    <td>{$row['phone_number']}</td>
                    <td>{$row['email_id']}</td>
                  </tr>";
        }
        echo "</table>";
    } else {
        echo "<p style='text-align:center; padding: 20px; color: #666;'>No bookings available. Use the form to add a passenger.</p>";
    }
    ?>
</div>

</body>
</html>