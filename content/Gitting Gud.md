his is a guide I made for myself, with some CheatSheet aspects to it.

And also to guide people on the correct path to using git, so they don't find myself in this situation: It's the end of your internship, you've been hard at work implementing new features, testing, addign CI/CD, then comes your supervisor to review your work, only to see, horrified how you have absolutely curb stomped their beautiful Git history and workflow

The motivation behind this is to finally get a grasp on how to use Git in a civilized way, with the main goal of having clean backups and a git story to make version control easier, but also, and not less important, to collaborate properly with existing projects.

## Making a repo
## Initializing a repo

```shell
git init
```

This will create a `.git` folder with the following structure:
```shell
.
├── COMMIT_EDITMSG
├── config
├── description
├── HEAD
├── hooks
│   └── README.sample
├── index
├── info
│   └── exclude
├── logs
│   ├── HEAD
│   └── refs
│       └── heads
│           └── main
├── objects
	<SNIP>
│   ├── info
│   └── pack
└── refs
    ├── heads
    │   └── main
    └── tags

```

There's no need to learn what all this does, but there are some interesting folders to keep in mind:

- **COMMIT_EDITMSG:** Last commit message
- **HEAD:** Points to current branch/ref
- **config:** local repo settings 
- **info/exclude:** Local .gitignore
- **Index:** Very important! It's the **"staging area"**
- **objects:** Actual git data
## Cloning a repo
```shell
git clone ssh://pi3dra@example.com/to/my-repo.git
```

This will make a local copy of the repository on you local machine, with it's git history and it's contents.

You can specify a specific directory to clone by adding it's name just after the repo link.


# Workflow

## Basic commands

A project, in it's simplest shape, normally follows this pattern:
Edit -> Stage -> Commit -> Push 

### Staging 
Git has a "staging area" that's where we propose changes through`git add` for the next commit.

### Commiting
```shell
git commit -m "short description"  
```
We can use this command to commit a snapshot of all the staged changes,  this will stage only what's added with `git add . or filename.txt or *.txt`, We can skip this step by running `git commit -a` which stands for all, so we comit all changes.

Also, if we did a fluke, we can fix it quickly with the `--amend` flag, which modifies the last commit, adding newly staged changes to the previous commit.

We can also add long descritpions, by simply omitting the `-m` flag our **default editor** will be opened, in which we can write a short and long description like so

```shell
Short Description

Long Description
# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
#
# On branch main
# Your branch is up to date with 'origin/main'.
#
# Changes to be committed:
#	modified:   blablabla.txt
#
```

See: [[Gitting Gud#Git Configuration]] to learn how to change your default editor.

#### Best practices

- Commit Often (don't wait to implement full features to commit, and don't commit every single change neither)
- Review what's in your staging area before commiting
- Add meaningful commit messages and descriptions

### Information and Inspection:
#### Diff
This command, on it's simplest version `git diff` shows the difference between the staged version and your current version.
#### Log
`git log` Displays the log of all the commits on your repo, with the author,date,commit message and hash, There are some useful flags like:
- --oneline: Displays only the hashes and commit messages
- --graph and --decorate: Displays the same information but in a text based graph view, this can be used to see branches more clearly.
- -S: if we append a text after this flag, it will show us in which commit it was introduced and in which commits it was modified.

#### Blame
As it name implies, `git blame <File>` is for blaming people lol, more seriously though it tells us:
- Who wrote this line?
- When did it change?
-  The respective commit hash and message

for bigger files we can limit the blaming to some lines with the `-L <start,end>` flag

# Branches

We can create a branch with
```
git switch -c feature-xyz
```
This command will create the branch if it doesn't exist and switch to it or simply move to the existing one.
## Merging

We can merge two branches with the following commands:
```
# Switch to main branch
git checkout main

# Make sure it's up to date
git pull origin main

git merge feature/login

```


## Rebasing

This will try to replay all your changes on top of the main branch:

```
git checkout NewFeature

git rebase main

```

After this we can do a fast forward merge

## Fast Forward



## Squashing

We can squash with rebase:

```
git switch NewFeature
git rebase -i HEAD~4
```

this will open a new editor with the following file:

```
pick 39f0da8 End of new feature
pick 801d6ea quick fix here
pick 90e8ec2 and here
pick 83f6749 and here again

# Rebase 798a30c..83f6749 onto 798a30c (4 commands)
#
# Commands:
# <SNIP> A list of useful commands <SNIP>
```

we can simply change the **pick** keyword to **squash** which will squash them into the previous **picl** commit, the we will get to write the commit message for the remaining pick commits in which we squashed the rest

If we don't want to squash starting from head, we can note down the hash of the commit just before those we want to squash, and do `git rebase -i <hash>`

`git merge squash` allows us to merge a feature into main wihtout recording the merge relationship, it's like if we did all the feature additions in one single commit in the main branch, this can be useful for really messy feature branche, or for merging really tiny features, 
### Workflow

There are many ways to correctly use git, but the main idea is to have a workflow that suits your needs (project size team size etc etc), that allows for easy un-doing of errors, and that introduces the least overhead.

There are thus many many ways to approach this.

The principal ones are:
### Centralized
### Feature Branch
### GitFlow 
### Github






# Git Configuration

```shell
git config
```

This command is inoked with a configuration name, often dot delimited.

We can configure git at many different levels:

- **--local (default)**: Used if no other flag is specified, and stores configurations in the local repository, precisely in the `.git/config` folder
- **--global:** Applies changes to all repos, for a single users.
- **--system:** Applies changes to all users on a machine.

Some common things to configure, and their commands:

**Core editor:**
```shell
git config --global core.editor "nvim"
```
**Merge Tools:**
```shell
git config --global merge.tool kdiff3
```
**Aliases (yes, like in your terminal):**
```shell
git config --global alias.ci commit
```
