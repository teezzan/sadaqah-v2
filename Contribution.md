Thank you for taking the time to contribute!

Please go through the active [issues](https://github.com/teezzan/sadaqah-v2/issues), before you plan to contribute.

# How to contribute
This are guidelines to contributing to this project. 

There are different ways to use git and GitHub.  
In this tutorial we will try to keep stuff simple using the command line.

## Find an issue

While viewing the repository you can use the tap "Issues" to view and filter specific [issues](https://github.com/teezzan/sadaqah-v2/issues).  
There are some tags like "good first issue" or "beginner" that might be of interest to you.


## Fork the repository

### Why should you fork the repository?
A fork of a repository is a copy that still remembers where it came from. Forking a repository allows you to freely experiment with changes without affecting the original project.
Advantages of this are:
- You can open your **own branches** separate from the forked (upstream) repository.
- You can easily keep your repository **up to date** by simply pulling changes from upstream.
- Once you have finished making the changes you want to make, **suggesting this changes** for the original is very easy.

Using forks and pull request makes developing with many contributors less complicated for everybody involved!

### How to fork the repository

As long as you are visiting the repository there is a button called "fork" on the top right of the page.  
By clicking it and confirming you can fork the repository.

***For the next steps you need to have git installed on your device. 
If you haven't already done that, [this page](https://git-scm.com/downloads) might help.***

## Clone your version of the repository

### Why do we clone the repository?

After forking a repository it still is not local on your device.  
For bringing the repository on your device you need to clone it.  

### How to clone

Go to your version of the repository, click on the "Code" button and choose one of three ways: HTTPS, ssh or GitHub Cli.
Copy the line beneath the method. 

Open a terminal and navigate to where you want to place the repository.  
Enter:

`git clone <copied url>`

## Create a branch

**Working on branches helps keeping different versions of your code and different uncompleted features from becoming a big mess.
You ***never*** work directly on the main branch (sometimes also called master).**

Change to the repository directory on your computer (if you are not already there):

`cd sadaqah-v2`

Now create a branch using the git checkout command:

`git checkout -b your-new-branch-name`

For example:

`git checkout -b do-something`

## Make necessary changes 

Do whatever you planned to do.

## Commit changes

### Adding files

For adding specific files:
`git add <filename>`

**Be sure only files you wish to add have been changed. Use `git status` to check.**

### Committing added files

Use  
`git commit -m "<commit message>"`
Your commit message should describe the changes you have made.

## Push changes to GitHub

To make your local changes visible for remote (so you can see and interact with them on GitHub) you need to push them.  

Push your changes using the command git push:

`git push origin <add-your-branch-name>`

## Create a pull request

In your repository on GitHub, you'll see a "Compare & pull request" button. Click on that button.

You will have the option to give some additional information to the changes your pull request is going to cause by entering text.
After you have done that, create the pull request by clicking on "Create pull request".

## Wait for review

Your reviewer might merge the request or ask for you to make some changes.  

***If there are some improvements you need to do, don't worry:***  
Everything you push on your branch will now be added to the pull request. (That is one of the reasons we need different branches for different issues!).
You can use the comments to ask for clarification if needed. As soon as the reviewer is happy, your changes will be merged.

### Happy Coding!
