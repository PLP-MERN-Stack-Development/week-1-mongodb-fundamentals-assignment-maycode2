# 1. Find all books in a specific genre
db.books.find({ genre: "Science Fiction" })

# 2. Find books published after a certain year
db.books.find({ published_year: { $gt: 2015 } })

#3. Find books by a specific author
db.books.find({ author: "Chinua Achebe" })

#4. Update the price of a specific book
db.books.updateOne(
  { title: "Purple Hibiscus" },
  { $set: { price: 18.99 } }
)

#5. Delete a book by its title
db.books.deleteOne({ title: "Old Man and the Sea" })


#Task 3: Advanced Queries

#6.  Find books that are both in stock and published after 2010
db.books.find({
  in_stock: true,
  published_year: { $gt: 2010 }
})

#7. Projection – Return only title, author, and price
db.books.find(
  {},
  { title: 1, author: 1, price: 1, _id: 0 }
)

#8.  Sorting – By price ascending
db.books.find().sort({ price: 1 })

#9. Sorting – By price descending
db.books.find().sort({ price: -1 })

# 10. Pagination – Limit and skip (e.g., 5 books per page)
#Page 1:
  db.books.find().limit(5)
#page 2
db.books.find().skip(5).limit(5)


Task 4: Aggregation Pipeline
#1. Calculate the average price of books by genre
db.books.aggregate([
  {
    $group: {
      _id: "$genre",
      averagePrice: { $avg: "$price" }
    }
  }
])

#2. Find the author with the most books in the collection
db.books.aggregate([
  {
    $group: {
      _id: "$author",
      totalBooks: { $sum: 1 }
    }
  },
  { $sort: { totalBooks: -1 } },
  { $limit: 1 }
])

#3. Group books by publication decade and count them
db.books.aggregate([
  {
    $project: {
      decade: {
        $concat: [
          { $toString: { $multiply: [{ $floor: { $divide: ["$published_year", 10] } }, 10] } },
          "s"
        ]
      }
    }
  },
  {
    $group: {
      _id: "$decade",
      count: { $sum: 1 }
    }
  },
  { $sort: { _id: 1 } }
])


#Task 5: Indexing

#1. Create an index on the title field
db.books.createIndex({ title: 1 })

#2. Create a compound index on author and published_year
db.books.createIndex({ author: 1, published_year: -1 })

#3. Use explain() to show performance improvement (optional example)
db.books.find({ title: "Purple Hibiscus" }).explain("executionStats")
