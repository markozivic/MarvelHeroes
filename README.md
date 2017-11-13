# MarvelHeroes

INSTALATION INSTRUCTIONS

To run this web site, just run "home.html" file from Site folder.

Now, you have web site in front of you, in search field you can start typing in you favourite character name.

As you type, you should be seeing up to 12 results (12 is maximum number of characters), for every character there should be displayed
only three things, image of that character, name and button to bookmark that character.

If you click on bookmark button, image should be downloaded behind the scenes and stored in "Downloads" folder.

I wasn't able to implement logic to read all the images that are marked as bookmarked using only JS, so I left that part undone.

Also because of that, I wasnt able to implement logic which will check if image is already bookmarked, because that would require of me
to check image names that are already in downloads folder.
----------------------------------------------------------------------------------------------------------------------------------------

LIMITS OF THE PROJECT

I noticed that when you start typing in the name of the character sometimes it happens that image is found, and not the character name,
that is because inside of JSON data there are many "name" key values, and they represent name of the character, and name of the comic book
that that character appeared in.
