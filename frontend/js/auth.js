const loginForm = document.getElementById("loginForm"); // so apha sikhangela i login form
loginForm.addEventListener("submit",handleLogin); // so xasiyfumene sobiza i function engu handleLogin().

// Function to handle login
async function handleLogin(event) {

    // Stop the page from refreshing
    event.preventDefault();

    const email =  document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const { data,error } = await window.supabaseClient.auth.signInWithPassword({
        email: email,
        password : password
    })

    if (error){
        console.error(error.message);
        console.log("Ishubile ta yam");

    } else {
        console.log("Login Succesful Bhuda!");
        console.log(data.user);
        const {data: profile, error: profileError } = 
        await window.supabaseClient
             .from("profiles")
             .select("*")
             .eq("id",data.user.id)
             .single()

        window.location.href = "pages/student-dashboard.html";
        
    }
}

