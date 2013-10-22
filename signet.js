/*

    ||||||
    Signet   Adam Schwartz

    Display a unique seal in the developer console of your page.
    https://github.com/HubSpot/signet

    Settings:

    - signet.title             - string  - title of your page (required to show color bars signet)
    - signet.author            - string  - author of your page
    - signet.description       - string  - description of your page

    - signet.signet            - boolean - show color bars signet above the title
    - signet.hue               - integer - hue offset for the color bars

    - signet.baseStyles        - string  - base style string for all parst of the singet (best used to set base font or color)
    - signet.titleStyles       - string  - title styles
    - signet.authorStyles      - string  - author styles
    - signet.descriptionStyles - string  - description styles

*/

(function(){
    var i, args;

    if (!window.console || !window.console.log || (!document.head && !window.signet))
        return;

    if (!window.signet)
        window.signet = {
            signet: true,
            title: document.title,
            author: document.head.querySelector('meta[name=author]').content,
            description: document.head.querySelector('meta[name=description]').content
        };

    signet.hue = signet.hue || 0;
    signet.baseStyles = 'color: #444; font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;';

    signet.titleStyles = signet.titleStyles || (signet.baseStyles + 'font-size: 20px; line-height: 30px;');
    signet.authorStyles = signet.authorStyles || (signet.baseStyles + 'font-size: 12px; line-height: 30px; padding-left: 20px;');
    signet.descriptionStyles = signet.descriptionStyles || (signet.baseStyles + 'font-size: 14px; line-height: 20px;');

    if (signet.signet !== false && signet.title) {
        args = [''];
        for (i = 0; i < signet.title.length; i++) {
            args[0] += '%c' + signet.title[i];
            if (signet.title[i] === ' ') {
                args.push(signet.titleStyles);
            } else {
                args.push(signet.titleStyles + 'background: hsl(' + (((signet.title[i].toLowerCase().charCodeAt(0) * 2) + signet.signet) % 255) + ', 80%, 80%); color: transparent; line-height: 0;');
            }
        }
        console.log.apply(console, args);
    }

    if (signet.title && signet.author)
        console.log('%c' + signet.title + '%c' + signet.author, signet.titleStyles, signet.authorStyles);

    if (signet.title && !signet.author)
        console.log('%c' + signet.title, signet.titleStyles);

    if (signet.description)
        console.log('%c' + signet.description, signet.descriptionStyles);
})();
