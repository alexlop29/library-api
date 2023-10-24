# Library API

Your task is to build a simple API to manage a library's book inventory. There are two main components of this API: management endpoints (to be used by the Librarians) and user facing endpoints for end-user actions.

Books are referenced by their ISBN. The library can have more than 1 copy of any given book (multiple copies of the same ISBN).

### API Endpoints to be built

- **Librarian Endpoints**

  - An endpoint to add a book (by ISBN) to the library.
  - An endpoint to remove a book (by its internal Id) from the library
  - An endpoint that generates a list of all overdue books.

- **User Endpoints**
  - An endpoint to check out a book (assume a 2 week checkout period from time of call). A User can check out any book except when:
    - They currently have 3 checked out books.
    - They are overdue on returning any book.
  - An endpoint to return a checked out book to the library
  - An endpoint that lists all currently checked out books for that user.

<aside>
💡 For the purposes of this exercise, we can assume there is a Librarian user (userId 1) and three regular users (userids, 2, 3, 4). You can hardcode this table. Also, no need to worry about authentication, etc.

</aside>

<aside>
⚙ You can complete this task in any language and using any libraries or frameworks you wish!

</aside>

<aside>
⏰ Take your time!  We want to encourage your best work.  There's no time limit for this assignment.  Some people complete it within a few days.  Others take a couple weeks.  It's all good!

</aside>
