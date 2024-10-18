// src/app/home/home.page.ts
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule],
})
export class HomePage {
  key: string = '';
  value: string = '';
  output: string = '';

 

  constructor(private storageService: StorageService) {}


  async setItem() {
    try {
      await this.storageService.set(this.key, this.value);
      this.output = `Set ${this.key}: ${this.value}`;
    } catch (error) {
      console.error('Error setting item', error);
      this.output = `Error setting item: ${error}`;
      throw error;
    }
  }

  async getItem() {
    try {
      const value = await this.storageService.get(this.key);
      this.output = `Get ${this.key}: ${value}`;
    } catch (error) {
      console.error('Error getting item', error);
      this.output = `Error getting item: ${error}`;
    }
  }

  async removeItem() {
    try {
      await this.storageService.remove(this.key);
      this.output = `Removed ${this.key}`;
    } catch (error) {
      console.error('Error removing item', error);
      this.output = `Error removing item: ${error}`;
    }
  }

  // Clear all items from storage
  async clearStorage() {
    try {
      await this.storageService.clear();
      this.output = 'Storage cleared';
    } catch (error) {
      console.error('Error clearing storage', error);
      this.output = `Error clearing storage: ${error}`;
    }
  }

   // Get all keys from storage
   async getAllKeys() {
    try {
      const keys = await this.storageService.keys();
      this.output = `Keys: ${keys.join(', ')}`;
    } catch (error) {
      console.error('Error getting keys', error);
      this.output = `Error getting keys: ${error}`;
    }
  }

  // Get length of storage (number of key-value pairs)
  async getStorageLength() {
    try {
      const length = await this.storageService.length();
      this.output = `Storage length: ${length}`;
    } catch (error) {
      console.error('Error getting storage length', error);
      this.output = `Error getting storage length: ${error}`;
    }
  }

  // Iterate through all key-value pairs
  async forEachItem() {
    try {
      let output = 'Storage contents:\n';
      await this.storageService.forEach((value: any, key: string) => {
        output += `${key}: ${value}\n`;
      });
      this.output = output;
    } catch (error) {
      console.error('Error iterating over storage', error);
      this.output = `Error iterating over storage: ${error}`;
    }
  }
}