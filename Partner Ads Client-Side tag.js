<script>
(function() {
    try {
        var captureAndStorePacidPaid = function() {
            // Function to get URL parameter value
            var getParameterByName = function(name) {
                try {
                    var url = window.location.href;
                    name = name.replace(/[\[\]]/g, '\\$&');
                    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
                        results = regex.exec(url);
                    if (!results) return null;
                    if (!results[2]) return '';
                    return decodeURIComponent(results[2].replace(/\+/g, ' '));
                } catch (error) {
                    console.error('Error getting parameter:', error);
                    return null;
                }
            };
            // Function to set cookie
            var setCookie = function(name, value, days) {
                try {
                    var date = new Date();
                    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                    var expires = "expires=" + date.toUTCString();
                    document.cookie = name + "=" + value + ";" + expires + ";path=/;domain=" + getRootDomain();
                } catch (error) {
                    console.error('Error setting cookie:', error);
                }
            };
            // Function to get root domain
            var getRootDomain = function() {
                try {
                    var parts = window.location.hostname.split('.');
                    if (parts.length > 2) {
                        return parts.slice(-2).join('.');
                    }
                    return window.location.hostname;
                } catch (error) {
                    console.error('Error getting root domain:', error);
                    return window.location.hostname;
                }
            };
            // Get pacid and paid from URL parameters
            var pacid = getParameterByName('pacid');
            var paid = getParameterByName('paid') || getParameterByName('pa-partnerid'); // Check both parameters
            
            // Store parameters in cookies if they exist
            if (pacid) {
                setCookie('pacid', pacid, 40);
            }
            if (paid) {
                setCookie('paid', paid, 40);
            }
        };
        // Call the function immediately
        captureAndStorePacidPaid();
    } catch (error) {
        console.error('An error occurred in the main function:', error);
    }
})();
</script>