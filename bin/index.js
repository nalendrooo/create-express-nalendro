#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const process = require('process');
const inquirer = require('inquirer');

// Fungsi untuk menyalin folder dan file secara rekursif, dengan pengecualian folder tertentu
function copyRecursive(src, dest) {
    const excludedDirs = ['.github', 'dist', 'node_modules'];
    if (excludedDirs.includes(path.basename(src))) {
        return;
    }

    if (fs.lstatSync(src).isDirectory()) {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest);
        }

        fs.readdirSync(src).forEach((item) => {
            const srcItem = path.join(src, item);
            const destItem = path.join(dest, item);
            copyRecursive(srcItem, destItem);
        });
    } else {
        fs.copyFileSync(src, dest);
    }
}

// Fungsi utama
async function main() {
    const [, , ...args] = process.argv;
    const projectName = args[0] || 'my-express-app';

    // Prompt untuk memilih antara JavaScript atau TypeScript
    const { projectType } = await inquirer.prompt([
        {
            type: 'list',
            name: 'projectType',
            message: 'What type of project are you creating?',
            choices: ['Express.js'],
            default: 'Express.js'
        }
    ]);

    // Prompt untuk memilih antara JavaScript atau TypeScript
    const { language } = await inquirer.prompt([
        {
            type: 'list',
            name: 'language',
            message: 'Which language would you like to use?',
            choices: ['TypeScript'],
            default: 'TypeScript'
        }
    ]);

    // Menentukan direktori template berdasarkan pilihan
    let templateDir;
    // if (projectType === 'React.js') {
    //     if (language === 'JavaScript') {
    //         templateDir = path.resolve(__dirname, '../create-express-nalen/template-react-javascript');
    //     } else if (language === 'TypeScript') {
    //         templateDir = path.resolve(__dirname, '../create-express-nalen/template-react-typescript');
    //     }
    // } 
    if (projectType === 'Express.js') {
        // if (language === 'JavaScript') {
        //     templateDir = path.resolve(__dirname, '../create-express-nalen/template-express-javascript');
        // } else 
        if (language === 'TypeScript') {
            templateDir = path.resolve(__dirname, '../template-express-typescript');
        }
    }

    // Path ke folder tujuan
    const dest = path.resolve(process.cwd(), projectName);

    // Buat folder tujuan jika belum ada
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }

    // Salin semua dari template ke folder tujuan
    copyRecursive(templateDir, dest);

    console.log(`Project ${projectName} created successfully at ${dest}`);
    console.log(`You chose ${projectType} - ${language}.`);
}

main();
